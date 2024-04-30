package com.wildSnap.apis.service.UserInfoUpdServ;

import com.wildSnap.apis.Util.UserInfoUpdtResBuild.UserInfoUpdateResponseBuilder;
import com.wildSnap.apis.Validator.UserInfoUpdValid.UserInfoUpdateValidatorService;
import com.wildSnap.apis.dao.UserInfoUpdDao.UserInfoUpdateDao;
import com.wildSnap.apis.request.UserInfoUptReq.UserInfoUpdateRequest;
import com.wildSnap.apis.response.UserInfoUptRes.UserInfoUpdateResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class UserInfoUpdateService {
    @Autowired
    private UserInfoUpdateDao dao;

    @Autowired
    private UserInfoUpdateValidatorService validatorService;

    public UserInfoUpdateResponse handleUpdateUserRequest(UserInfoUpdateRequest request) throws Exception{

        if(validatorService.validateUpdateUserRequest(request)) {

            log.info("Successfully Validated the Student List by Student Oid Request.....!");

            int insertCount = dao.updateUser(request);

            if(insertCount > 0) {
                log.info("Sending success response ....");
                return UserInfoUpdateResponseBuilder.buildUserUpdateResponse(request, "200", "OK", "Successfully edited user profile");
            }
            else {
                log.info("Sending Failure response ....");
                return UserInfoUpdateResponseBuilder.buildUserUpdateResponse(request, "501", "Failed", "Failed to edit user profile");
            }
        }
        log.info("Sending Invalid Request response ....");
        return UserInfoUpdateResponseBuilder.buildUserUpdateResponse( request, "501", "Failed", "Invalid Request");
    }
}
