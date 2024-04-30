package com.wildSnap.apis.request.UserInfoRequest;

import com.wildSnap.apis.request.RequestHeader;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserInfoRequest {
    private RequestHeader header;
    private UserInfoRequestBody body;

}
