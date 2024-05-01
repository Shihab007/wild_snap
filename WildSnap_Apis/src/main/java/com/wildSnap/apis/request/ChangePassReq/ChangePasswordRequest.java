package com.wildSnap.apis.request.ChangePassReq;

import com.wildSnap.apis.request.LoginReq.LoginRequestBody;
import com.wildSnap.apis.request.RequestHeader;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ChangePasswordRequest {
    private RequestHeader header;
    private ChangePasswordRequestBody body;
}
