package com.wildSnap.apis.service.UserInfoService;

import com.wildSnap.apis.Validator.UserInfoValid.UserInfoValidatorService;
import com.wildSnap.apis.Util.UserInfoResBuild.UserInfoResponseBuilder;
import com.wildSnap.apis.dao.UserInfoDao.UserInfoDao;
import com.wildSnap.apis.model.UserInfoModel;
import com.wildSnap.apis.request.UserInfoRequest.UserInfoRequest;
import com.wildSnap.apis.response.userInfoResponse.UserInfoResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class UserInfoService {
    @Autowired
    private UserInfoDao dao;

    @Autowired
    private UserInfoValidatorService validatorService;

    public UserInfoResponse handleUserRequest(UserInfoRequest request) throws Exception{

        if(validatorService.validateUserRequest(request)) {

            log.info("Successfully Validated the Student List by Student Oid Request.....!");

            UserInfoModel user = dao.loadUserInfo(request);

            if(user != null) {
                log.info("Sending success for the Student List by Student Oid response ....");
                return UserInfoResponseBuilder.buildUserResponse(user, request, "200", "OK");
            }
            else {
                log.info("Sending Failure for the Student List by Student Oid response ....");
                return UserInfoResponseBuilder.buildUserResponse(user, request, "501", "Failed");
            }
        }
        log.info("Sending Invalid Request for the Student List by Student Oid response ....");
        return UserInfoResponseBuilder.buildUserResponse(null, request, "501", "Failed");
    }
}
