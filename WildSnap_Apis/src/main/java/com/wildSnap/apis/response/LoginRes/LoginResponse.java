package com.wildSnap.apis.response.LoginRes;

import com.wildSnap.apis.response.ResponseHeader;
import com.wildSnap.apis.response.userInfoResponse.UserInfoResponseBody;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class LoginResponse {
    private ResponseHeader header;
    private LoginResponseBody body;
}
