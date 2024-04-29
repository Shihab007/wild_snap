package com.test.apis.response;

import com.test.apis.model.PersonListModel;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class PersonListResponseBody {
    private List<PersonListModel> personList;
}
