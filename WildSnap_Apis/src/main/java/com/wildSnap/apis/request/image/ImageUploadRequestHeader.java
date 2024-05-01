package com.wildSnap.apis.request.image;

import java.util.Date;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ImageUploadRequestHeader {

    private String requestId;
    private Date requestDateTime;
    private String requestSource;
    private String requestServiceSource;

}
