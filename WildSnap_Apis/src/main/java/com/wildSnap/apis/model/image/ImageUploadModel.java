package com.wildSnap.apis.model.image;


import com.wildSnap.apis.Util.image.UtilService;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ImageUploadModel {

	private String name;
	private String url;
	private String message;
	
	@Override
	public String toString() {
		return UtilService.print(this);
	}

}
