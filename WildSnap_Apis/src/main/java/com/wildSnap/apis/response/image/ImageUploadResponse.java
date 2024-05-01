package com.wildSnap.apis.response.image;

import com.wildSnap.apis.Util.image.UtilService;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
@Builder
@AllArgsConstructor
public class ImageUploadResponse {

	private String name;
	private String url;
	private String message;
	
	@Override
	public String toString() {
		return UtilService.print(this);
	}
}
