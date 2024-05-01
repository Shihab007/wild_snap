package com.wildSnap.apis.response.ChangePassRes;

import com.wildSnap.apis.response.LoginRes.LoginResponseBody;
import com.wildSnap.apis.response.ResponseHeader;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ChangePasswordResponse {
    private ResponseHeader header;
    private ChangePasswordResponseBody body;
}
