package com.wildSnap.apis.Validator.UserInfoValid;

import com.wildSnap.apis.request.UserInfoRequest.UserInfoRequest;
import org.springframework.stereotype.Service;

@Service
public class UserInfoValidatorService {
    public boolean validateUserRequest(UserInfoRequest request){
        boolean isValidRequest = true;
        if (request.getBody() == null)
        {
            isValidRequest = false;
            return isValidRequest;
        }
        if (request.getBody().getOid() == null)
        {
            isValidRequest = false;
            return isValidRequest;
        }

        return isValidRequest;
    }
}
