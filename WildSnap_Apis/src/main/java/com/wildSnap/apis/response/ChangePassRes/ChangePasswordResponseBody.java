package com.wildSnap.apis.response.ChangePassRes;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ChangePasswordResponseBody {
    private String loginId;
    private String email;
}
