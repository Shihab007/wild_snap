package com.wildSnap.apis.Util.ChangePassResBuild;

import com.wildSnap.apis.model.ChangePassMod.ChangePassModel;
import com.wildSnap.apis.request.ChangePassReq.ChangePasswordRequest;
import com.wildSnap.apis.response.ChangePassRes.ChangePasswordResponse;
import com.wildSnap.apis.response.ChangePassRes.ChangePasswordResponseBody;
import com.wildSnap.apis.response.ResponseHeader;

import java.util.Date;

public class ChangePasswordResponseBuilder {
    public static ChangePasswordResponse buildChangePasswordResponse(ChangePasswordRequest changePasswordRequest,
                                                                          String responseCode, String status, String loginStatus, String menuJson, String authorizationKey,
                                                                          ChangePassModel userModel, String message) {

        ChangePasswordResponse response = new ChangePasswordResponse();
        ResponseHeader responseHeader = new ResponseHeader();
        ChangePasswordResponseBody responseBody = new ChangePasswordResponseBody();
        responseHeader.setRequestId(changePasswordRequest.getHeader().getRequestId());
        responseHeader.setResponseDateTime(new Date());
        responseHeader.setResponseCode(responseCode);
        responseHeader.setStatus(status);
        response.setHeader(responseHeader);
        if (userModel != null) {
            responseBody.setEmail(changePasswordRequest.getBody().getEmail());
            responseBody.setLoginId(changePasswordRequest.getBody().getLoginId());
            response.setBody(responseBody);

        } else {
            response.setBody(null);
        }

        return response;

    }
}
