package com.wildSnap.apis.request.classifyimage;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ClassifyImageRequestBody {

    public String oid;
    public String imageUrl;
    public String imagePath;
    public String imageName;
    public String imageDescription;

}