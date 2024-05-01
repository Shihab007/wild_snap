package com.wildSnap.apis.request.LoginReq;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class LoginRequestBody {
    public String loginId;
    public String password;
}
