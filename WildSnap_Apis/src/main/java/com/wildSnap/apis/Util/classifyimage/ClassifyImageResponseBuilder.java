package com.wildSnap.apis.Util.classifyimage;

import com.wildSnap.apis.request.classifyimage.ClassifyImageRequest;
import com.wildSnap.apis.response.ResponseHeader;
import com.wildSnap.apis.response.classifyimage.ClassifyImageResponse;
import com.wildSnap.apis.response.classifyimage.ClassifyImageResponseBody;

import java.util.Date;

public class ClassifyImageResponseBuilder {

    public static ClassifyImageResponse buildSaveClassifyImageResponse(String oid, ClassifyImageRequest request,
                                                           String responseCode, String responseStatus) {

        ClassifyImageResponse response = new ClassifyImageResponse();
        ResponseHeader responseHeader = new ResponseHeader();
        responseHeader.setResponseDateTime(new Date());
        responseHeader.setResponseCode(responseCode);
        responseHeader.setStatus(responseStatus);
        response.setHeader(responseHeader);

        ClassifyImageResponseBody responseBody = new ClassifyImageResponseBody();

        if (oid != null) {
            responseBody.setOid(oid);
        }
        response.setBody(responseBody);

        return response;
    }
}

