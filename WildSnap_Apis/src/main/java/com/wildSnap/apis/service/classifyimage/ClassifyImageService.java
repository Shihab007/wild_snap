package com.wildSnap.apis.service.classifyimage;

import com.wildSnap.apis.IdGenerator;
import com.wildSnap.apis.Util.classifyimage.ClassifyImageResponseBuilder;
import com.wildSnap.apis.Validator.classifyimage.ClassifyImageValidatorService;
import com.wildSnap.apis.dao.classifyimage.ClassifyImageDao;
import com.wildSnap.apis.request.classifyimage.ClassifyImageRequest;
import com.wildSnap.apis.response.classifyimage.ClassifyImageResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class ClassifyImageService {
    @Autowired
    private ClassifyImageDao dao;

    @Autowired
    private IdGenerator idGenerator;

    @Autowired
    private ClassifyImageValidatorService validatorService;

    public ClassifyImageResponse handleUserRequest(ClassifyImageRequest request) throws Exception{

        if(validatorService.validateLoginRequest(request)) {

            log.info("Successfully Validated Request.....!");
            request.getBody().setOid(idGenerator.generateOid());
            int check = dao.save(request);

            if(check > 0) {
                log.info("Sending success for the response ....");
                return ClassifyImageResponseBuilder.buildSaveClassifyImageResponse(request.getBody().getOid(), request, "200", "OK");
            }
            else {
                log.info("Sending Failure for the response ....");
                return ClassifyImageResponseBuilder.buildSaveClassifyImageResponse(request.getBody().getOid(), request, "501", "Failed");
            }
        }
        log.info("Sending Invalid Request for the  response ....");
        return ClassifyImageResponseBuilder.buildSaveClassifyImageResponse(null, request, "501", "Failed");
    }
}
