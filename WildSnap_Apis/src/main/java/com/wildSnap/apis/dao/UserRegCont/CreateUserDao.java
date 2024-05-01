package com.wildSnap.apis.dao.UserRegCont;

import com.wildSnap.apis.model.UserRegMod.UserModel;
import com.wildSnap.apis.request.UserRegReq.CreateUserRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.sql.ResultSet;
import org.springframework.jdbc.core.RowMapper;

import java.sql.SQLException;
import java.util.UUID;

@Repository
public class CreateUserDao {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @SuppressWarnings("deprecation")
    public boolean isLoginIdExist(String username) {

        String sql = "SELECT * FROM wild_snap.wild_snap.login WHERE login_id = ?";

        UserModel user = new UserModel();

        try {
            user = (UserModel) jdbcTemplate.queryForObject(sql, new Object[] { username.trim().toLowerCase() }, new RowMapper<UserModel>() {

                @Override
                public UserModel mapRow(ResultSet rs, int rwNumber) throws SQLException {
                    UserModel userModel = new UserModel();

                    userModel.setUserName(rs.getString("user_name"));
                    userModel.setOid(rs.getString("oid"));
                    userModel.setLoginId(rs.getString("login_id"));
                    userModel.setRoleOid(rs.getString("role_oid"));
                    userModel.setPassword(rs.getString("password"));
                    userModel.setStatus(rs.getString("status"));

                    return userModel;
                }
            });

        } catch (Exception e) {
            System.out.println("Login ID doesn't exist");
            return false;
        }
        System.out.println("Login ID " + username + " already exist");
        System.out.println(user);
        return true;
    }

    public int saveLogin(CreateUserRequest request) {

        return jdbcTemplate.update(
                "insert into wild_snap.wild_snap.login (oid, login_id, password, user_name, name_en, email, mobile_no, "
                        + " role_oid)"
                        + " values( "
                        + "?, ?, ?, ?, ?, ?, ?, ?)",


                UUID.randomUUID(),
                request.getBody().getUserName(),
                request.getBody().getPassword(),
                request.getBody().getUserName(),
                request.getBody().getNameEn(),
                request.getBody().getEmail(),
                request.getBody().getMobileNo(),
                request.getBody().getRoleOid()

        );


    }

}
