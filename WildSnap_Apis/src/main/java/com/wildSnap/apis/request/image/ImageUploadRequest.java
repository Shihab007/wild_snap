package com.wildSnap.apis.request.image;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ImageUploadRequest {

	private ImageUploadRequestHeader header;
    private ImageUploadRequestBody body;

}
