package com.wildSnap.apis.controllers.LoginCont;

import com.wildSnap.apis.Util.LoginUtils.LoginResponseBuilder;
import com.wildSnap.apis.Util.UserInfoResBuild.UserInfoResponseBuilder;
import com.wildSnap.apis.request.LoginReq.LoginRequest;
import com.wildSnap.apis.request.UserInfoRequest.UserInfoRequest;
import com.wildSnap.apis.response.LoginRes.LoginResponse;
import com.wildSnap.apis.response.userInfoResponse.UserInfoResponse;
import com.wildSnap.apis.service.LoginServ.LoginService;
import com.wildSnap.apis.service.UserInfoService.UserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("wild-snap")
public class LoginController {
    @Autowired
    private LoginService service;

    @PostMapping("/login")
    public LoginResponse userInfo(@RequestBody LoginRequest loginRequest){
        try{
            return service.handleUserRequest(loginRequest);
        }catch (Exception e){
            return LoginResponseBuilder.buildLoginResponse(null, loginRequest, "501", "Failed");
        }

    }
}
