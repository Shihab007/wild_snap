package com.wildSnap.apis.Validator.UserInfoUpdValid;

import com.wildSnap.apis.request.UserInfoRequest.UserInfoRequest;
import com.wildSnap.apis.request.UserInfoUptReq.UserInfoUpdateRequest;
import org.springframework.stereotype.Service;

@Service
public class UserInfoUpdateValidatorService {
    public boolean validateUpdateUserRequest(UserInfoUpdateRequest request){
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
