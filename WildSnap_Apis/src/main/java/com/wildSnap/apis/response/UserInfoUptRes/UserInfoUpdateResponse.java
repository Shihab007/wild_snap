package com.wildSnap.apis.response.UserInfoUptRes;

import com.wildSnap.apis.response.ResponseHeader;
import com.wildSnap.apis.response.userInfoResponse.UserInfoResponseBody;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserInfoUpdateResponse {
    private ResponseHeader header;
    private UserInfoUpdateResponseBody body;
}
