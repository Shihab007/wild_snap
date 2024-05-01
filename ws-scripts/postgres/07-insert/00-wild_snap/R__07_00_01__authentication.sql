-- role
insert into "wild_snap".role (oid, role_id, role_description, menu_json, role_type, status) values ('wild-snap-oid-admin','wild-snap-admin','Wild Snap Admin','[{}]','Admin','Active');
insert into "wild_snap".role (oid, role_id, role_description, menu_json, role_type, status) values ('wild-snap-oid-user','wild-snap-user','Wild Snap User','[{}]','User','Active');
commit;

-- login
insert into "wild_snap".login (oid, login_id, password, user_name, name_en, email, mobile_no, status, role_oid) values ('wild-snap-login-oid-0002','wild-snap-login-id-0022','1234','Polash','Polash','Polash6661@gmail.com','1725868816','Active','wild-snap-oid-user');
insert into "wild_snap".login (oid, login_id, password, user_name, name_en, email, mobile_no, status, role_oid) values ('wild-snap-login-oid-0003','wild-snap-login-id-0033','1234','Zubair','Zubair','Zubair6661@gmail.com','1725868816','Active','wild-snap-oid-user');
insert into "wild_snap".login (oid, login_id, password, user_name, name_en, email, mobile_no, status, role_oid) values ('wild-snap-login-oid-0001','wild-snap-login-id-0001','1234','Shihab Uddin','Shihab','shihab2241@gmail.com','1858056089','Active','wild-snap-oid-admin');
commit;


