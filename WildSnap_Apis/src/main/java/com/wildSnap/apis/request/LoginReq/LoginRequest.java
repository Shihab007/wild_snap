package com.wildSnap.apis.request.LoginReq;

import com.wildSnap.apis.request.RequestHeader;
import com.wildSnap.apis.request.UserInfoRequest.UserInfoRequestBody;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class LoginRequest {
    private RequestHeader header;
    private LoginRequestBody body;

}
