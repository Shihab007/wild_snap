package com.wildSnap.apis.controllers.UserInfoUpdCont;

import com.wildSnap.apis.Util.UserInfoResBuild.UserInfoResponseBuilder;
import com.wildSnap.apis.Util.UserInfoUpdtResBuild.UserInfoUpdateResponseBuilder;
import com.wildSnap.apis.request.UserInfoRequest.UserInfoRequest;
import com.wildSnap.apis.request.UserInfoUptReq.UserInfoUpdateRequest;
import com.wildSnap.apis.response.UserInfoUptRes.UserInfoUpdateResponse;
import com.wildSnap.apis.response.userInfoResponse.UserInfoResponse;
import com.wildSnap.apis.service.UserInfoService.UserInfoService;
import com.wildSnap.apis.service.UserInfoUpdServ.UserInfoUpdateService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@CrossOrigin("*")
@RequestMapping("wild-snap")
public class UserInfoUpdateController {
    @Autowired
    private UserInfoUpdateService service;

    @PostMapping("/user-info-update")
    public UserInfoUpdateResponse userInfo(@RequestBody UserInfoUpdateRequest userUpdateRequest){
        try{
            UserInfoUpdateResponse response = new UserInfoUpdateResponse();
            response = service.handleUpdateUserRequest(userUpdateRequest);
            System.out.println("check : " + response );
            return response;
        }catch (Exception e){
            UserInfoUpdateResponse response = new UserInfoUpdateResponse();
            e.printStackTrace();
            log.error("Update User Info error response:{}",e.getMessage());
            response = UserInfoUpdateResponseBuilder.buildUserUpdateResponse(userUpdateRequest, "501","Failed", "Failed to edit teacher profile");
            System.out.println("check : " + response );
            return response;
        }

    }
}
