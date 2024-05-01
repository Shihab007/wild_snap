package com.wildSnap.apis.Validator.UserRegValid;

import com.wildSnap.apis.request.UserRegReq.CreateUserRequest;
import org.springframework.stereotype.Service;

@Service
public class CreateUserValidatorService {
    public boolean validateCreateUserRequest(CreateUserRequest createUserRequest) {

        boolean isValidRequest = true;
        if (createUserRequest.getBody() == null)
        {
            isValidRequest = false;
            return isValidRequest;
        }

        return isValidRequest;

    }
}
