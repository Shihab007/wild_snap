-- role
insert into "wild_snap".role (oid, role_id, role_description, menu_json, role_type, status) values ('wild-snap-oid-admin','wild-snap-admin','Wild Snap Admin','[{}]','Admin','Active');
insert into "wild_snap".role (oid, role_id, role_description, menu_json, role_type, status) values ('wild-snap-oid-user','wild-snap-user','Wild Snap User','[{}]','User','Active');
commit;

-- login
insert into "wild_snap".login (oid, login_id, password, user_name, name_en, name_bn, email, mobile_no, photo_path, photo_url, status, role_oid) values ('wild-snap-login-oid-0001','wild-snap-login-id-0001','1234','shihab','Shihab','শিহাব','shihab6661@gmail.com','1725868816',null,null,'Active','wild-snap-oid-admin');
commit;


