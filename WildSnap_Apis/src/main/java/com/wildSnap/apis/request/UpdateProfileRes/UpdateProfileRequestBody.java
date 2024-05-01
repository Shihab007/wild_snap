package com.wildSnap.apis.request.UpdateProfileRes;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UpdateProfileRequestBody {
    public String oid;
    public String userName;
    public String name;
    public String email;
    public String password;
    public String mobile;
}
