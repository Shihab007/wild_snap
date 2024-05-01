package com.wildSnap.apis.response.UserRegRes;

import com.wildSnap.apis.response.ResponseHeader;
import com.wildSnap.apis.response.UserListRes.UserListResponseBody;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CreateUserResponse {
    private ResponseHeader header;
    private CreateUserResponseBody body;
}
