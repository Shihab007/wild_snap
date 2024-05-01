package com.wildSnap.apis.controllers.UserRegCont;

import com.wildSnap.apis.Util.UserRegResBuild.CreateUserResponseBuilder;
import com.wildSnap.apis.request.UserRegReq.CreateUserRequest;
import com.wildSnap.apis.response.UserRegRes.CreateUserResponse;
import com.wildSnap.apis.service.UserRegServ.CreateUserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@CrossOrigin("*")
@RequestMapping("wild-snap")
public class CreateUserController {
    @Autowired
    private CreateUserService service;

    @PostMapping("/create-user")
    public CreateUserResponse createTeacherProfileResponse(@RequestBody CreateUserRequest request)
    {
        try {
            return service.handleCreateTeacherRequest(request);
        } catch(Exception e) {
            e.printStackTrace();
            log.error("Create User Profile Request error response:{}",e.getMessage());
            return CreateUserResponseBuilder.buildCreateUserResponse(request, "501", "Failed", "Failed to Create Teacher Profile");
        }
    }
}
