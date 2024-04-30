package com.wildSnap.apis.service;

import com.wildSnap.apis.Validator.PersonListValidatorService;
import com.wildSnap.apis.Util.PersonListResponseBuilder;
import com.wildSnap.apis.dao.PersonListDao;
import com.wildSnap.apis.model.PersonListModel;
import com.wildSnap.apis.request.PersonListRequest;
import com.wildSnap.apis.response.PersonListResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class PersonListService {

    @Autowired
    private PersonListDao dao;

    @Autowired
    private PersonListValidatorService personListValidator;

    public PersonListResponse handlePersonRequest(PersonListRequest personRequest) throws Exception{

        if(personListValidator.validatePersonListRequest(personRequest)){
            log.info("Successfully Validated the Request.....!");

            List<PersonListModel> personList = dao.personDao(personRequest);

            if (personList != null){
                log.info("Sending success response..............");
                return PersonListResponseBuilder.buildPersonResponse(personList, personRequest, "200", "OK");
            }else {
                log.info("Sending Failure response..............");
                return PersonListResponseBuilder.buildPersonResponse(null, personRequest, "501", "Failed");
            }
        }
        log.info("Sending Invalid Request response.................");
        return PersonListResponseBuilder.buildPersonResponse(null, personRequest, "501", "Failed");
    }
}
