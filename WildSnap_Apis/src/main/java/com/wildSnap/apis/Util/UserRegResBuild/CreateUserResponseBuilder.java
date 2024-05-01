package com.wildSnap.apis.Util.UserRegResBuild;

import com.wildSnap.apis.request.UserRegReq.CreateUserRequest;
import com.wildSnap.apis.response.ResponseHeader;
import com.wildSnap.apis.response.UserRegRes.CreateUserResponse;
import com.wildSnap.apis.response.UserRegRes.CreateUserResponseBody;

import java.util.Date;

public class CreateUserResponseBuilder {
    public static CreateUserResponse buildCreateUserResponse(CreateUserRequest createUserRequest, String responseCode, String status, String message) {

        CreateUserResponse response = new CreateUserResponse();
        ResponseHeader responseHeader = new ResponseHeader();
        CreateUserResponseBody responseBody = new CreateUserResponseBody();
        responseHeader.setRequestId(createUserRequest.getHeader().getRequestId());
        responseBody.setOid(createUserRequest.getBody().getOid());


        responseHeader.setResponseDateTime(new Date());
        responseHeader.setResponseCode(responseCode);
        responseHeader.setStatus(status);
        responseHeader.setMessage(message);
        response.setHeader(responseHeader);
        response.setBody(responseBody);
        return response;

    }
}
