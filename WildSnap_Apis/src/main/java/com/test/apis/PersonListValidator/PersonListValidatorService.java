package com.test.apis.PersonListValidator;
import com.test.apis.request.PersonListRequest;
import org.springframework.stereotype.Service;

@Service
public class PersonListValidatorService {
    public boolean validatePersonListRequest(PersonListRequest getPersonListRequest){
            boolean isValidRequest = true;
            if (getPersonListRequest.getBody() != null) return true;
            return isValidRequest;
    }
}
