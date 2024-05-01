package com.wildSnap.apis.service;

import com.wildSnap.apis.Validator.UserListValidatorService;
import com.wildSnap.apis.Util.UserListResponseBuilder;
import com.wildSnap.apis.dao.UserListDao;
import com.wildSnap.apis.model.UserListModel;
import com.wildSnap.apis.request.UserListReq.UserListRequest;
import com.wildSnap.apis.response.UserListRes.UserListResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class UserListService {

    @Autowired
    private UserListDao dao;

    @Autowired
    private UserListValidatorService personListValidator;

    public UserListResponse handlePersonRequest(UserListRequest personRequest) throws Exception{

        if(personListValidator.validatePersonListRequest(personRequest)){
            log.info("Successfully Validated the Request.....!");

            List<UserListModel> personList = dao.personDao(personRequest);

            if (personList != null){
                log.info("Sending success response..............");
                return UserListResponseBuilder.buildPersonResponse(personList, personRequest, "200", "OK");
            }else {
                log.info("Sending Failure response..............");
                return UserListResponseBuilder.buildPersonResponse(null, personRequest, "501", "Failed");
            }
        }
        log.info("Sending Invalid Request response.................");
        return UserListResponseBuilder.buildPersonResponse(null, personRequest, "501", "Failed");
    }
}
