package com.wildSnap.apis.controllers.UserInfoCont;

import com.wildSnap.apis.Util.UserInfoResBuild.UserInfoResponseBuilder;
import com.wildSnap.apis.request.UserInfoRequest.UserInfoRequest;
import com.wildSnap.apis.response.userInfoResponse.UserInfoResponse;
import com.wildSnap.apis.service.UserInfoService.UserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("wild-snap")
public class UserInfoController {
    @Autowired
    private UserInfoService service;

    @PostMapping("/user-info")
    public UserInfoResponse userInfo(@RequestBody UserInfoRequest userRequest){
        try{
            return service.handleUserRequest(userRequest);
        }catch (Exception e){
            return UserInfoResponseBuilder.buildUserResponse(null, userRequest, "501", "Failed");
        }

    }
}
