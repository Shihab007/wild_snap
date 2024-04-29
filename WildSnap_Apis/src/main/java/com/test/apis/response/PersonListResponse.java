package com.test.apis.response;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PersonListResponse {
    private ResponseHeader header;
    private PersonListResponseBody body;
}
