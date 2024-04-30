package com.wildSnap.apis.Validator.LoginValid;

import com.wildSnap.apis.request.LoginReq.LoginRequest;
import com.wildSnap.apis.request.UserInfoRequest.UserInfoRequest;
import org.springframework.stereotype.Service;

@Service
public class LoginValidatorService {
    public boolean validateLoginRequest(LoginRequest request){
        boolean isValidRequest = true;
        if (request.getBody() == null)
        {
            isValidRequest = false;
            return isValidRequest;
        }
        if (request.getBody().getUserName() == null && request.getBody().getPassword() == null)
        {
            isValidRequest = false;
            return isValidRequest;
        }

        return isValidRequest;
    }
}
