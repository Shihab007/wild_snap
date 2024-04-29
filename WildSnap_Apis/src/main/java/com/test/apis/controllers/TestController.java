package com.test.apis.controllers;

import com.test.apis.PersonUtil.PersonListResponseBuilder;
import com.test.apis.request.PersonListRequest;
import com.test.apis.response.PersonListResponse;
import com.test.apis.service.PersonListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("person-list")
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
