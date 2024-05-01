package com.wildSnap.apis.controllers.ChangePassCont;

import com.wildSnap.apis.request.ChangePassReq.ChangePasswordRequest;
import com.wildSnap.apis.response.ChangePassRes.ChangePasswordResponse;
import com.wildSnap.apis.service.ChangePasswordServ.ChangePassService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("wild-snap")
@Slf4j
public class ChangePassController {
    @Autowired
    private ChangePassService changePasswordService;


    @PostMapping("/change-password")
    public ChangePasswordResponse changePassword(@RequestBody ChangePasswordRequest changePasswordRequest)
    {
        log.error(".........Received change Password Request............");
        ChangePasswordResponse response = changePasswordService.handleChangePasswordRequest(changePasswordRequest);
        return response;
    }

}
