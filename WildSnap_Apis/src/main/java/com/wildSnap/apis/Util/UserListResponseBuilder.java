package com.wildSnap.apis.Util;

import com.wildSnap.apis.model.UserListModel;
import com.wildSnap.apis.request.UserListReq.UserListRequest;
import com.wildSnap.apis.response.UserListRes.UserListResponse;
import com.wildSnap.apis.response.UserListRes.UserListResponseBody;
import com.wildSnap.apis.response.ResponseHeader;

import java.util.Date;
import java.util.List;

public class UserListResponseBuilder {

    public static UserListResponse buildPersonResponse(List<UserListModel> userList,
                                                       UserListRequest personRequest, String responseCode, String responseStatus){
        UserListResponse response = new UserListResponse();
        ResponseHeader responseHeader = new ResponseHeader();
        responseHeader.setResponseDateTime(new Date());
        responseHeader.setResponseCode(responseCode);
        response.setHeader(responseHeader);

        UserListResponseBody responseBody = new UserListResponseBody();

        if(userList != null){
            responseBody.setUserList(userList);
        }
        response.setBody(responseBody);

        return response;
    }
}
