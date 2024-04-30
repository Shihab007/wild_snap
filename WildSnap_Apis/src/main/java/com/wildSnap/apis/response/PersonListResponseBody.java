package com.wildSnap.apis.response;

import com.wildSnap.apis.model.PersonListModel;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class PersonListResponseBody {
    private List<PersonListModel> personList;
}
