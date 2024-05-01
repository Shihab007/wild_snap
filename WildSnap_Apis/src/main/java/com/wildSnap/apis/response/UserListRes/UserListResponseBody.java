package com.wildSnap.apis.response.UserListRes;

import com.wildSnap.apis.model.UserListModel;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class UserListResponseBody {
    private List<UserListModel> userList;
}
