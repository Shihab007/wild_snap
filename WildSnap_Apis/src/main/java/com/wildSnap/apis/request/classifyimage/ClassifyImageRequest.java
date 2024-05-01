package com.wildSnap.apis.request.classifyimage;

import com.wildSnap.apis.request.RequestHeader;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ClassifyImageRequest {
    private RequestHeader header;
    private ClassifyImageRequestBody body;

}
