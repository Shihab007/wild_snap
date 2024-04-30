package com.wildSnap.apis.request.UserInfoUptReq;

import com.wildSnap.apis.request.RequestHeader;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserInfoUpdateRequest {
    private RequestHeader header;
    private UserInfoUpdateRequestBody body;
}
