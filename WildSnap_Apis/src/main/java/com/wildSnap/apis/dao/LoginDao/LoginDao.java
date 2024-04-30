package com.wildSnap.apis.dao.LoginDao;

import com.wildSnap.apis.model.LoginMod.LoginModel;
import com.wildSnap.apis.model.UserInfoModel;
import com.wildSnap.apis.request.LoginReq.LoginRequest;
import com.wildSnap.apis.request.UserInfoRequest.UserInfoRequest;
import io.micrometer.common.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class LoginDao {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public LoginModel loadLoginInfo(LoginRequest request) throws Exception{

        LoginModel user = new LoginModel();

        try {
            String sql = " select l.oid, l.role_oid, r.role_type, l.login_id, l.user_name , l.name_en, " +
                    " l.name_bn, l.mobile_no, l.email , l.status " +
                    " from wild_snap.wild_snap.login l " +
                    " left join wild_snap.wild_snap.role r on r.oid = l.role_oid  " +
                    " where 1 = 1 ";

            if(StringUtils.isNotBlank(request.getBody().getUserName())){
                sql += " and user_name = '" + request.getBody().getUserName() +"' ";
            }

            if(StringUtils.isNotBlank(request.getBody().getPassword())){
                sql += " and password = '" + request.getBody().getPassword() +"' ";
            }

            List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql);

            for(Map<String, Object> row:rows){
                user.setOid((String) row.get("oid"));
                user.setRoleOid((String) row.get("role_oid"));
                user.setRoleType((String) row.get("role_type"));
                user.setLoginId((String) row.get("login_id"));
                user.setUserName((String) row.get("user_name"));
                user.setNameEn((String) row.get("name_en"));
                user.setNameBn((String) row.get("name_bn"));
                user.setMobileNo((String) row.get("mobile_no"));
                user.setEmail((String) row.get("email"));
                user.setLoginStatus((String) row.get("status"));
                break;

            }


        }catch(Exception e) {
            e.printStackTrace();

        }

        return user;
    }
}
