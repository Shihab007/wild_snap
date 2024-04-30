package com.wildSnap.apis.response.userInfoResponse;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserInfoResponseBody {
    public String oid;
    public String userName;
    public String name;
    public String email;
    public String password;

}
