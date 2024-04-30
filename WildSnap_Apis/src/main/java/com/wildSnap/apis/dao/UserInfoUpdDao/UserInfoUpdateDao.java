package com.wildSnap.apis.dao.UserInfoUpdDao;

import com.wildSnap.apis.model.UserInfoModel;
import com.wildSnap.apis.request.UserInfoRequest.UserInfoRequest;
import com.wildSnap.apis.request.UserInfoUptReq.UserInfoUpdateRequest;
import io.micrometer.common.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class UserInfoUpdateDao {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public int updateUser(UserInfoUpdateRequest request) {

        UserInfoModel user = new UserInfoModel();

            String sql = " update wild_snap.wild_snap.login set " +
                    " user_name = ?, name_en = ?, email = ?, password = ?, mobile_no = ? " +
                    " where 1 = 1 ";

            if(StringUtils.isNotBlank(request.getBody().getOid())){
                sql += " and oid = '" + request.getBody().getOid() +"' ";
            }

            return jdbcTemplate.update(sql,
                    request.getBody().getUserName(),
                    request.getBody().getName(),
                    request.getBody().getEmail(),
                    request.getBody().getPassword(),
                    request.getBody().getMobile()
                    );
    }
}
