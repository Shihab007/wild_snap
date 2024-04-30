package com.wildSnap.apis.Util.UserInfoUpdtResBuild;

import com.wildSnap.apis.request.UserInfoUptReq.UserInfoUpdateRequest;
import com.wildSnap.apis.response.ResponseHeader;
import com.wildSnap.apis.response.UserInfoUptRes.UserInfoUpdateResponse;
import com.wildSnap.apis.response.UserInfoUptRes.UserInfoUpdateResponseBody;

import java.util.Date;

public class UserInfoUpdateResponseBuilder {

    public static UserInfoUpdateResponse buildUserUpdateResponse(UserInfoUpdateRequest request, String responseCode, String status, String message) {

        UserInfoUpdateResponse response = new UserInfoUpdateResponse();
        ResponseHeader responseHeader = new ResponseHeader();
        UserInfoUpdateResponseBody responseBody = new UserInfoUpdateResponseBody();
        responseHeader.setRequestId(request.getHeader().getRequestId());
        responseHeader.setResponseDateTime(new Date());
        responseHeader.setResponseCode(responseCode);
        responseHeader.setStatus(status);
        responseHeader.setMessage(message);

        responseBody.setOid(request.getBody().getOid());

        response.setHeader(responseHeader);
        response.setBody(responseBody);
        return response;
    }
}

