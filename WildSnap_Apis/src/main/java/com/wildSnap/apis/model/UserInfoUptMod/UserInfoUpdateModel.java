package com.wildSnap.apis.model.UserInfoUptMod;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserInfoUpdateModel {
    public String userName;
    public String name;
    public String email;
    public String password;
    public String mobile;
}
