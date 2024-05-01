package com.wildSnap.apis.model;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserInfoModel {
    public String oid;
    public String userName;
    public String nameEn;
    public String email;
    public String mobileNo;
}
