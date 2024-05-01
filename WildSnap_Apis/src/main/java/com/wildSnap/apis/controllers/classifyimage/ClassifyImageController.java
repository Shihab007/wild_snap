package com.wildSnap.apis.controllers.classifyimage;

import com.wildSnap.apis.Util.classifyimage.ClassifyImageResponseBuilder;
import com.wildSnap.apis.request.classifyimage.ClassifyImageRequest;
import com.wildSnap.apis.response.classifyimage.ClassifyImageResponse;
import com.wildSnap.apis.service.classifyimage.ClassifyImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
public class ClassifyImageController {
    @Autowired
    private ClassifyImageService service;

    @PostMapping("/classify-image-add")
    public ClassifyImageResponse save(@RequestBody ClassifyImageRequest loginRequest){
        try{
            return service.handleUserRequest(loginRequest);
        }catch (Exception e){
            return ClassifyImageResponseBuilder.buildSaveClassifyImageResponse(null, loginRequest, "501", "Failed");
        }

    }
}
