package com.wildSnap.apis.request.ChangePassReq;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
@NoArgsConstructor
public class ChangePasswordRequestBody {
    @NotNull
    @Size(min = 5, max = 128)
    private String loginId;

    @NotNull
    @Size(min = 5, max = 128)
    private String email;

    @NotNull
    @Size(min = 5, max = 128)
    private String newPassword;

    @NotNull
    @Size(min = 5, max = 128)
    private String confirmNewPassword;

    @NotNull
    @Size(min = 5, max = 20)
    private String loginStatus;

    @NotNull
    @Size(min = 5, max = 128)
    private String oldPassword;
}
