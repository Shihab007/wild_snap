package com.wildSnap.apis.response.LoginRes;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class LoginResponseBody {
    public String oid;
    public String roleOid;
    public String roleType;
    public String loginId;
    public String userName;
    public String nameEn;
    public String nameBn;
    public String mobileNo;
    public String email;
    public String loginStatus;

}
