package com.wildSnap.apis.Util.UserInfoResBuild;

import com.wildSnap.apis.model.UserInfoModel;
import com.wildSnap.apis.request.UserInfoRequest.UserInfoRequest;
import com.wildSnap.apis.response.userInfoResponse.UserInfoResponse;
import com.wildSnap.apis.response.ResponseHeader;
import com.wildSnap.apis.response.userInfoResponse.UserInfoResponseBody;

import java.util.Date;

public class UserInfoResponseBuilder {

    public static UserInfoResponse buildUserResponse(UserInfoModel user, UserInfoRequest request,
                                                     String responseCode, String responseStatus) {

        UserInfoResponse response = new UserInfoResponse();
        ResponseHeader responseHeader = new ResponseHeader();
        responseHeader.setResponseDateTime(new Date());
        responseHeader.setResponseCode(responseCode);
        responseHeader.setStatus(responseStatus);
        response.setHeader(responseHeader);

        UserInfoResponseBody responseBody = new UserInfoResponseBody();

        if (user != null) {
            responseBody.setOid(user.getOid());
            responseBody.setUserName(user.getUserName());
            responseBody.setNameEn(user.getNameEn());
            responseBody.setEmail(user.getEmail());
            responseBody.setMobileNo(user.getMobileNo());
        }
        response.setBody(responseBody);

        return response;
    }
}

