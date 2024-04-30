package com.wildSnap.apis.controllers;

import com.wildSnap.apis.Util.PersonListResponseBuilder;
import com.wildSnap.apis.request.PersonListRequest;
import com.wildSnap.apis.response.PersonListResponse;
import com.wildSnap.apis.service.PersonListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("wild-snap")
public class TestController {
    @Autowired
    private PersonListService service;

    @PostMapping("/test")
    public PersonListResponse personList(@RequestBody PersonListRequest personRequest){
        try{
            return service.handlePersonRequest(personRequest);
        }catch (Exception e){
            return PersonListResponseBuilder.buildPersonResponse(null, personRequest, "501", "Failed");
        }

    }
}
