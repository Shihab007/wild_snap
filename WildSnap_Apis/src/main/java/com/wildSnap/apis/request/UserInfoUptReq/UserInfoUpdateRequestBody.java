package com.wildSnap.apis.request.UserInfoUptReq;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserInfoUpdateRequestBody {
    public String oid;
    public String userName;
    public String name;
    public String email;
    public String password;
    public String mobile;
}
