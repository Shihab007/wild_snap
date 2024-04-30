package com.wildSnap.apis.service.LoginServ;

import com.wildSnap.apis.Util.LoginUtils.LoginResponseBuilder;
import com.wildSnap.apis.Util.UserInfoResBuild.UserInfoResponseBuilder;
import com.wildSnap.apis.Validator.LoginValid.LoginValidatorService;
import com.wildSnap.apis.Validator.UserInfoValid.UserInfoValidatorService;
import com.wildSnap.apis.dao.LoginDao.LoginDao;
import com.wildSnap.apis.dao.UserInfoDao.UserInfoDao;
import com.wildSnap.apis.model.LoginMod.LoginModel;
import com.wildSnap.apis.model.UserInfoModel;
import com.wildSnap.apis.request.LoginReq.LoginRequest;
import com.wildSnap.apis.request.UserInfoRequest.UserInfoRequest;
import com.wildSnap.apis.response.LoginRes.LoginResponse;
import com.wildSnap.apis.response.userInfoResponse.UserInfoResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class LoginService {
    @Autowired
    private LoginDao dao;

    @Autowired
    private LoginValidatorService validatorService;

    public LoginResponse handleUserRequest(LoginRequest request) throws Exception{

        if(validatorService.validateLoginRequest(request)) {

            log.info("Successfully Validated the Student List by Student Oid Request.....!");

            LoginModel user = dao.loadLoginInfo(request);

            if(user != null) {
                log.info("Sending success for the Student List by Student Oid response ....");
                return LoginResponseBuilder.buildLoginResponse(user, request, "200", "OK");
            }
            else {
                log.info("Sending Failure for the Student List by Student Oid response ....");
                return LoginResponseBuilder.buildLoginResponse(user, request, "501", "Failed");
            }
        }
        log.info("Sending Invalid Request for the Student List by Student Oid response ....");
        return LoginResponseBuilder.buildLoginResponse(null, request, "501", "Failed");
    }
}
