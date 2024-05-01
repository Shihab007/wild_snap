package com.wildSnap.apis.controllers;

import com.wildSnap.apis.Util.UserListResponseBuilder;
import com.wildSnap.apis.request.UserListReq.UserListRequest;
import com.wildSnap.apis.response.UserListRes.UserListResponse;
import com.wildSnap.apis.service.UserListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("wild-snap")
public class UserListController {
    @Autowired
    private UserListService service;

    @PostMapping("/user-list")
    public UserListResponse personList(@RequestBody UserListRequest personRequest){
        try{
            return service.handlePersonRequest(personRequest);
        }catch (Exception e){
            return UserListResponseBuilder.buildPersonResponse(null, personRequest, "501", "Failed");
        }

    }
}
