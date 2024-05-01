package com.wildSnap.apis.dao.ChangePassDao;

import com.wildSnap.apis.model.ChangePassMod.ChangePassModel;
import com.wildSnap.apis.request.ChangePassReq.ChangePasswordRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public class ChangePasswordDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public int checkOldPassword(ChangePasswordRequest request) {
        String sql = "select count(*) from wild_snap.wild_snap.login where  login_id = '"
                + request.getBody().getLoginId() + "' and password = '" + request.getBody().getOldPassword() + "' ";
        return jdbcTemplate.queryForObject(sql, Integer.class);
    }

    public String getOldPassword(ChangePasswordRequest request) {
        String sql = "select password from wild_snap.wild_snap.login where  login_id = '"
                + request.getBody().getLoginId() + "' and password = '" + request.getBody().getOldPassword() + "' ";
        return jdbcTemplate.queryForObject(sql, String.class);
    }

    public ChangePassModel changePassword(ChangePasswordRequest changePasswordRequest) {
        String sql = "UPDATE wild_snap.wild_snap.login set password = ? WHERE (email = ? or login_id = ?)";
        jdbcTemplate.update(sql, changePasswordRequest.getBody().getNewPassword(),
                changePasswordRequest.getBody().getEmail(), changePasswordRequest.getBody().getLoginId());
        ChangePassModel passModel = new ChangePassModel();
        return passModel;
    }
}
