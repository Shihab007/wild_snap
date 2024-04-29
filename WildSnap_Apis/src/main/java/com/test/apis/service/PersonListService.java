package com.test.apis.service;

import com.test.apis.PersonListValidator.PersonListValidatorService;
import com.test.apis.PersonUtil.PersonListResponseBuilder;
import com.test.apis.dao.PersonListDao;
import com.test.apis.model.PersonListModel;
import com.test.apis.request.PersonListRequest;
import com.test.apis.response.PersonListResponse;
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
