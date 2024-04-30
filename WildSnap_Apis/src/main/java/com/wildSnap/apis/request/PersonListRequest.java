package com.wildSnap.apis.request;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PersonListRequest {
    private RequestHeader header;
    private PersonListRequestBody body;

}
