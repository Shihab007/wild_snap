package com.wildSnap.apis.response.UserListRes;

import com.wildSnap.apis.response.ResponseHeader;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserListResponse {
    private ResponseHeader header;
    private UserListResponseBody body;
}
