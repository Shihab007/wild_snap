package com.wildSnap.apis.Util;

import com.wildSnap.apis.model.PersonListModel;
import com.wildSnap.apis.request.PersonListRequest;
import com.wildSnap.apis.response.PersonListResponse;
import com.wildSnap.apis.response.PersonListResponseBody;
import com.wildSnap.apis.response.ResponseHeader;

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
