package com.wildSnap.apis.response.userInfoResponse;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserInfoResponseBody {
    public String oid;
    public String userName;
    public String nameEn;
    public String email;
    public String mobileNo;

}
