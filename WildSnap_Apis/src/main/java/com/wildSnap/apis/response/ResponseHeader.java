package com.wildSnap.apis.response;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
@Data
@NoArgsConstructor
public class ResponseHeader {
    private String requestId;
    private Date requestDateTime;
    private Date responseDateTime;
    private String responseCode;
    private String status;
    private String message;
}
