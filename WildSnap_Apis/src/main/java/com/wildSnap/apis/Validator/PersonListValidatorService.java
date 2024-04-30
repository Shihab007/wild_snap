package com.wildSnap.apis.Validator;
import com.wildSnap.apis.request.PersonListRequest;
import org.springframework.stereotype.Service;

@Service
public class PersonListValidatorService {
    public boolean validatePersonListRequest(PersonListRequest getPersonListRequest){
            boolean isValidRequest = true;
            if (getPersonListRequest.getBody() != null) return true;
            return isValidRequest;
    }
}
