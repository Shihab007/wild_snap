package com.wildSnap.apis.service.ChangePasswordServ;


import com.wildSnap.apis.Util.ChangePassResBuild.ChangePasswordResponseBuilder;
import com.wildSnap.apis.dao.ChangePassDao.ChangePasswordDao;
import com.wildSnap.apis.model.ChangePassMod.ChangePassModel;
import com.wildSnap.apis.request.ChangePassReq.ChangePasswordRequest;
import com.wildSnap.apis.response.ChangePassRes.ChangePasswordResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import javax.validation.Valid;

@Service
public class ChangePassService {
    @Autowired
    private ChangePasswordDao changePasswordDao;

    public ChangePasswordResponse handleChangePasswordRequest(
            @RequestBody @Valid ChangePasswordRequest changePasswordRequest){

        ChangePassModel userModel = new ChangePassModel();
        try {

            // SEND failed response if password is too short
            if (changePasswordRequest.getBody().getNewPassword().length() < 5) {
                return ChangePasswordResponseBuilder.buildChangePasswordResponse(changePasswordRequest,
                        "501", "FAILED", "FAILED", "", "", userModel,
                        "Sorry, The password is too short");
            }
            // SEND failed response if password is too short
            if (!changePasswordRequest.getBody().getNewPassword()
                    .equals(changePasswordRequest.getBody().getConfirmNewPassword())) {
                return ChangePasswordResponseBuilder.buildChangePasswordResponse(changePasswordRequest,
                        "501", "FAILED", "FAILED", "", "", userModel,
                        "Sorry, Your New Password and Confirm Password is not same !!!.");
            }
            if((changePasswordDao.checkOldPassword(changePasswordRequest)) > 0 || ("_$change_$password_$by_$otp_$or_$email".equals(changePasswordRequest.getBody().getOldPassword())) ) {
                // SEND success Response
                if(("_$change_$password_$by_$otp_$or_$email".equals(changePasswordRequest.getBody().getOldPassword()) || (!changePasswordDao.getOldPassword(changePasswordRequest).equals(changePasswordRequest.getBody().getNewPassword())))) {
                    userModel = changePasswordDao.changePassword(changePasswordRequest);
                    return ChangePasswordResponseBuilder.buildChangePasswordResponse(changePasswordRequest,
                            "200", "OK", "OK", "", "", userModel,
                            "Password has been changed successfully");
                }else {
                    return ChangePasswordResponseBuilder.buildChangePasswordResponse(changePasswordRequest,
                            "501", "FAILED", "FAILED", "", "", userModel,
                            "Sorry, Your Old Password and New Password are Same !!!.");
                }
            }else {
                return ChangePasswordResponseBuilder.buildChangePasswordResponse(changePasswordRequest,
                        "501", "FAILED", "FAILED", "", "", userModel,
                        "Sorry, Your Old Password Not Match !!!.");
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return ChangePasswordResponseBuilder.buildChangePasswordResponse(changePasswordRequest,
                "501", "FAILED", "FAILED", "", "", null,
                "Sorry. Your password could not be updated successfully");

    }
}
