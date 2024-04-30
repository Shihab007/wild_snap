package com.wildSnap.apis.response.userInfoResponse;

import com.wildSnap.apis.response.ResponseHeader;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserInfoResponse {
    private ResponseHeader header;
    private UserInfoResponseBody body;
}
