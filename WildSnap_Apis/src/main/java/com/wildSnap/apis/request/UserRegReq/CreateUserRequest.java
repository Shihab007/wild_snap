package com.wildSnap.apis.request.UserRegReq;

import com.wildSnap.apis.request.RequestHeader;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CreateUserRequest {
    private RequestHeader header;
    private CreateUserRequestBody body;
}
