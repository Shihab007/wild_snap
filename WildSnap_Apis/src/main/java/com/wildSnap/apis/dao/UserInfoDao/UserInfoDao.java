package com.wildSnap.apis.dao.UserInfoDao;

import com.wildSnap.apis.model.UserInfoModel;
import com.wildSnap.apis.request.UserInfoRequest.UserInfoRequest;
import io.micrometer.common.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class UserInfoDao {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public UserInfoModel loadUserInfo(UserInfoRequest request) throws Exception{

        UserInfoModel user = new UserInfoModel();

        try {
            String sql = " select oid, user_name , name_en , email, mobile_no "
                   + " from wild_snap.wild_snap.login "
                   + " where 1 = 1 ";

            if(StringUtils.isNotBlank(request.getBody().getOid())){
                sql += " and oid = '" + request.getBody().getOid() +"' ";
            }

            List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql);

            for(Map<String, Object> row:rows){
                user.setOid((String) row.get("oid"));
                user.setUserName((String) row.get("user_name"));
                user.setNameEn((String) row.get("name_en"));
                user.setEmail((String) row.get("email"));
                user.setMobileNo((String) row.get("mobile_no"));
                break;

            }


        }catch(Exception e) {
            e.printStackTrace();

        }

        return user;
    }
}
