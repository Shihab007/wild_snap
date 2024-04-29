package com.test.apis.request;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PersonListRequest {
    private RequestHeader header;
    private PersonListRequestBody body;

}
