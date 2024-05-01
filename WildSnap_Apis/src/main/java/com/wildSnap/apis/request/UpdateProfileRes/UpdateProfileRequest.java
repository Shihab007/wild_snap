package com.wildSnap.apis.request.UpdateProfileRes;

import com.wildSnap.apis.request.RequestHeader;
import com.wildSnap.apis.request.UserInfoUptReq.UserInfoUpdateRequestBody;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UpdateProfileRequest {
    private RequestHeader header;
    private UpdateProfileRequestBody body;
}
