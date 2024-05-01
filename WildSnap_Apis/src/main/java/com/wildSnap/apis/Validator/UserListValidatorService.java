package com.wildSnap.apis.Validator;
import com.wildSnap.apis.request.UserListReq.UserListRequest;
import org.springframework.stereotype.Service;

@Service
public class UserListValidatorService {
    public boolean validatePersonListRequest(UserListRequest getPersonListRequest){
            boolean isValidRequest = true;
            if (getPersonListRequest.getBody() != null) return true;
            return isValidRequest;
    }
}
