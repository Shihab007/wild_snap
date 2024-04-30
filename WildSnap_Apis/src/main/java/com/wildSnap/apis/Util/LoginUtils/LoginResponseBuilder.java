package com.wildSnap.apis.Util.LoginUtils;

import com.wildSnap.apis.model.LoginMod.LoginModel;
import com.wildSnap.apis.model.UserInfoModel;
import com.wildSnap.apis.request.LoginReq.LoginRequest;
import com.wildSnap.apis.request.UserInfoRequest.UserInfoRequest;
import com.wildSnap.apis.response.LoginRes.LoginResponse;
import com.wildSnap.apis.response.LoginRes.LoginResponseBody;
import com.wildSnap.apis.response.ResponseHeader;
import com.wildSnap.apis.response.userInfoResponse.UserInfoResponse;
import com.wildSnap.apis.response.userInfoResponse.UserInfoResponseBody;

import java.util.Date;

public class LoginResponseBuilder {

    public static LoginResponse buildLoginResponse(LoginModel user, LoginRequest request,
                                                  String responseCode, String responseStatus) {

        LoginResponse response = new LoginResponse();
        ResponseHeader responseHeader = new ResponseHeader();
        responseHeader.setResponseDateTime(new Date());
        responseHeader.setResponseCode(responseCode);
        responseHeader.setStatus(responseStatus);
        response.setHeader(responseHeader);

        LoginResponseBody responseBody = new LoginResponseBody();

        if (user != null) {
            responseBody.setOid(user.getOid());
            responseBody.setRoleOid(user.getRoleOid());
            responseBody.setRoleType(user.getRoleType());
            responseBody.setLoginId(user.getLoginId());
            responseBody.setUserName(user.getUserName());
            responseBody.setNameEn(user.getNameEn());
            responseBody.setNameBn(user.getNameBn());
            responseBody.setMobileNo(user.getMobileNo());
            responseBody.setEmail(user.getEmail());
            responseBody.setLoginStatus(user.getLoginStatus());
        }
        response.setBody(responseBody);

        return response;
    }
}

