package com.wildSnap.apis.Validator.classifyimage;

import com.wildSnap.apis.request.classifyimage.ClassifyImageRequest;
import org.springframework.stereotype.Service;

@Service
public class ClassifyImageValidatorService {
    public boolean validateLoginRequest(ClassifyImageRequest request){
        boolean isValidRequest = true;
        if (request.getBody() == null){
            isValidRequest = false;
            return isValidRequest;
        }
        return isValidRequest;
    }
}
