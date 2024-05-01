package com.wildSnap.apis.controllers.image;


import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import com.wildSnap.apis.Api;
import com.wildSnap.apis.model.image.FileInfoModel;
import com.wildSnap.apis.request.image.ImageUploadRequest;
import com.wildSnap.apis.response.image.ImageUploadResponse;
import com.wildSnap.apis.service.image.ImageUploadService;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

import lombok.extern.slf4j.Slf4j;

@CrossOrigin(Api.SERVER_BASE)
@RestController
@Slf4j
public class ImageUploadController {

	@Autowired
	private ImageUploadService imageUploadService;

	@PostMapping(Api.FILE_UPLOAD)
	public ResponseEntity<ImageUploadResponse> uploadFile(@RequestParam("file") MultipartFile file) {
		log.info("File Upload Request received....");

		String message = "";
		try {
			String randomFileName = UUID.randomUUID().toString();
			String inputFileExtension = FilenameUtils.getExtension(file.getOriginalFilename());
			String newFileName = randomFileName+"."+inputFileExtension;
			
			String filePath = imageUploadService.save(file, randomFileName);

			message = "Uploaded the file successfully: " + file.getOriginalFilename();
			log.info("File upload saved successfully...");
			return ResponseEntity.status(HttpStatus.OK).body(new ImageUploadResponse(newFileName,filePath,message));
		} catch (Exception e) {
			e.printStackTrace();
			message = "Could not upload the file: " + file.getOriginalFilename() + "!";
			log.error(e.getMessage());
			return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ImageUploadResponse(file.getOriginalFilename(),null,message));
		}
	}


	@GetMapping(Api.FILE_LIST)
	public ResponseEntity<List<FileInfoModel>> getListFiles() {
		log.info("File list Request received....");
		List<FileInfoModel> fileInfos = imageUploadService.loadAll().map(path -> {
			String filename = path.getFileName().toString();
			String url = MvcUriComponentsBuilder
					.fromMethodName(ImageUploadController.class, "getFile", path.getFileName().toString()).build().toString();

			return new FileInfoModel(filename, url);
		}).collect(Collectors.toList());

		return ResponseEntity.status(HttpStatus.OK).body(fileInfos);
	}

	@GetMapping(Api.FILE_DOWNLOAD+"/files/{filename:.+}")
	@ResponseBody
	public ResponseEntity<Resource> getFile(@PathVariable String filename) {
		log.info("File download Request received....");
		
    	String url = Api.FILE_DOWNLOAD;
    	log.debug("API URL:{}", url);
    	
		Resource file = imageUploadService.load(filename);
		return ResponseEntity.ok()
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"").body(file);
	}


	@PostMapping(Api.MOVE_UPLOADED_FILE)
	public ResponseEntity<ImageUploadResponse> moveFile(@RequestBody ImageUploadRequest imageUploadV1Request) throws IOException {

		String fileName = imageUploadV1Request.getBody().getImageName();

		Path temp = Files.move
				(Paths.get(Api.originalFile + fileName), 
						Paths.get(Api.invalidFile + fileName));
		if(temp != null){
			System.out.println("File renamed and moved successfully");
		}
		else
		{
			System.out.println("Failed to move the file");
		}
		return null;
	}
}
