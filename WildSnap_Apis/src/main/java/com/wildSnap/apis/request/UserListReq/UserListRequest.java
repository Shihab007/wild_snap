package com.wildSnap.apis.request.UserListReq;

import com.wildSnap.apis.request.RequestHeader;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserListRequest {
    private RequestHeader header;
    private UserListRequestBody body;

}
