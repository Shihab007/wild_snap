package com.wildSnap.apis.request.UserRegReq;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;

@Data
@NoArgsConstructor
public class CreateUserRequestBody {
    public String oid;
    public String loginId;
    public String password;
    public String userName;
    public String nameEn;
    public String email;
    public String mobileNo;
    public String status;
    public String roleOid;
    public String createdBy;
    public Date createdOn;
}
