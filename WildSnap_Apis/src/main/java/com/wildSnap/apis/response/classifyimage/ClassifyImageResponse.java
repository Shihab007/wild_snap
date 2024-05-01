package com.wildSnap.apis.response.classifyimage;

import com.wildSnap.apis.response.ResponseHeader;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ClassifyImageResponse {
    private ResponseHeader header;
    private ClassifyImageResponseBody body;
}
