package com.wildSnap.apis.model.UserRegMod;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
@Data
@NoArgsConstructor
public class UserModel {
    public String oid;
    public String loginId;
    public String password;
    public String userName;
    public String nameEn;
    public String email;
    public String mobileNo;
    public String status;
    public String roleOid;

}
