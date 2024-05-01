package com.wildSnap.apis.service.UserRegServ;
import com.wildSnap.apis.Util.UserRegResBuild.CreateUserResponseBuilder;
import com.wildSnap.apis.Validator.UserRegValid.CreateUserValidatorService;
import com.wildSnap.apis.coreUtils.ConstantVals;
import com.wildSnap.apis.coreUtils.IdGenerator;
import com.wildSnap.apis.dao.UserRegCont.CreateUserDao;
import io.micrometer.common.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import com.wildSnap.apis.request.UserRegReq.CreateUserRequest;
import com.wildSnap.apis.response.UserRegRes.CreateUserResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;


@Slf4j
@Service
public class CreateUserService {
    @Autowired
    private IdGenerator idGenerator;

    @Autowired
    private CreateUserValidatorService createUserValidatorService;

    @Autowired
    private CreateUserDao createUserDao;

    public CreateUserResponse handleCreateTeacherRequest(@RequestBody CreateUserRequest request) throws Exception{

        log.info("Getting Request for Creating User Profile !!!!");

        if(createUserValidatorService.validateCreateUserRequest(request)) {

            log.info("The Request is Validated successfully.... !!!!");
            boolean isLoginIdExist = createUserDao.isLoginIdExist(request.getBody().getLoginId());

            if(!isLoginIdExist) {

                //generated oid's
                request.getBody().setOid(idGenerator.generateId());

                request.getBody().setRoleOid(ConstantVals.ROLE_USER);
                if(StringUtils.isBlank(request.getBody().getCreatedBy())){
                    request.getBody().setCreatedBy(ConstantVals.SYSTEM);
                }


                //insert login data
                int insertLoginCount = createUserDao.saveLogin(request);

                if(insertLoginCount > 0) {

                    log.info("Sending success response ....");
                    return CreateUserResponseBuilder.buildCreateUserResponse(request, "200", "OK", "Successfully Create User Profile");
                }
                else {
                    log.info("Sending failed response ....");
                    return CreateUserResponseBuilder.buildCreateUserResponse(request, "501","Failed", "Failed to Create User Profile");
                }
            }
            else {
                log.info("Sending failed response due login ID duplication ....");
                return CreateUserResponseBuilder.buildCreateUserResponse(request, "501","Failed", "Login ID already exist!");
            }


        }
        return CreateUserResponseBuilder.buildCreateUserResponse(request, "501","Failed", "Invalid Request");
    }
}
