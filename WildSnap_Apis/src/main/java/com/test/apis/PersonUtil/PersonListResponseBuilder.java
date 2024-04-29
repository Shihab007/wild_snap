package com.test.apis.PersonUtil;

import com.test.apis.model.PersonListModel;
import com.test.apis.request.PersonListRequest;
import com.test.apis.response.PersonListResponse;
import com.test.apis.response.PersonListResponseBody;
import com.test.apis.response.ResponseHeader;

import java.util.Date;
import java.util.List;

public class PersonListResponseBuilder {

    public static PersonListResponse buildPersonResponse(List<PersonListModel> personList,
                                                         PersonListRequest personRequest, String responseCode, String responseStatus){
        PersonListResponse response = new PersonListResponse();
        ResponseHeader responseHeader = new ResponseHeader();
        responseHeader.setResponseDateTime(new Date());
        responseHeader.setResponseCode(responseCode);
        response.setHeader(responseHeader);

        PersonListResponseBody responseBody = new PersonListResponseBody();

        if(personList != null){
            responseBody.setPersonList(personList);
        }
        response.setBody(responseBody);

        return response;
    }
}
