package com.wildSnap.apis.response.UpdateProfileRes;

import com.wildSnap.apis.response.ResponseHeader;
import com.wildSnap.apis.response.UserInfoUptRes.UserInfoUpdateResponseBody;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UpdateProfileResponse {
    private ResponseHeader header;
    private UpdateProfileResponseBody body;
}
