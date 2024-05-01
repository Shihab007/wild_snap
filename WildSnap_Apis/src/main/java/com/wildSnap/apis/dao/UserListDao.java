package com.wildSnap.apis.dao;

import com.wildSnap.apis.model.UserListModel;
import com.wildSnap.apis.request.UserListReq.UserListRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Repository
public class UserListDao {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<UserListModel> personDao(UserListRequest personRequest) throws Exception{
        String sql = " select l.oid, l.user_name , l.name_en ,l.email ,l.mobile_no, l.role_oid, l.status " +
                " from wild_snap.wild_snap.login l " +
                " where 1 = 1 ";

        List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql);
        List<UserListModel> result = new ArrayList<UserListModel>();
        for(Map<String, Object> row:rows){
            UserListModel user = new UserListModel();
            user.setOid((String) row.get("oid"));
            user.setUserName((String) row.get("user_name"));
            user.setNameEn((String) row.get("name_en"));
            user.setEmail((String) row.get("email"));
            user.setMobileNo((String) row.get("mobile_no"));
            user.setRoleOid((String) row.get("role_oid"));
            user.setStatus((String) row.get("status"));
            result.add(user);
        }
        return result;
    }
}
