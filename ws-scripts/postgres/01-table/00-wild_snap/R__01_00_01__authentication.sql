/*
-
oid                            : -
role_id                        : -
role_description               : -
menu_json                      : -
role_type                      : -
status                         : -
created_by                     : -
created_on                     : -
updated_by                     : -
updated_on                     : -
*/
create table                   "wild_snap".role
(
oid                            varchar(128)                                                not null,
role_id                        varchar(128)                                                not null,
role_description               text                                                        not null,
menu_json                      text,
role_type                      varchar(32),
status                         varchar(32)                                                 not null,
created_by                     varchar(128)                                                not null       default 'System',
created_on                     timestamp                                                   not null       default current_timestamp,
updated_by                     varchar(128),
updated_on                     timestamp,
constraint                     pk_role                                                     primary key    (oid),
constraint                     uk_role_id_role                                             unique         (role_id)
);

/*
-
oid                            : -
login_id                       : -
password                       : -
user_name                      : -
name_en                        : -
name_bn                        : -
email                          : -
mobile_no                      : -
photo_path                     : -
photo_url                      : -
status                         : -
reset_required                 : -
role_oid                       : -
trace_id                       : -
last_login_time                : -
last_logout_time               : -
password_expire_time           : -
created_by                     : -
created_on                     : -
updated_by                     : -
updated_on                     : -
*/
create table                   "wild_snap".login
(
oid                            varchar(128)                                                not null,
login_id                       varchar(128)                                                not null,
password                       varchar(256),
user_name                      varchar(256)                                                not null,
name_en                        varchar(256),
name_bn                        varchar(256),
email                          varchar(256),
mobile_no                      varchar(64),
photo_path                     varchar(512),
photo_url                      varchar(512),
status                         varchar(128),
reset_required                 varchar(32),
role_oid                       varchar(128)                                                not null,
trace_id                       varchar(128),
last_login_time                timestamp,
last_logout_time               timestamp,
password_expire_time           timestamp,
created_by                     varchar(128)                                                not null       default 'System',
created_on                     timestamp                                                   not null       default current_timestamp,
updated_by                     varchar(128),
updated_on                     timestamp,
constraint                     pk_login                                                    primary key    (oid),
constraint                     uk_login_id_login                                           unique         (login_id),
constraint                     fk_role_oid_login                                           foreign key    (role_oid)
                                                                                           references     "wild_snap".role(oid)
);

/*
-
oid                            : -
login_id                       : -
password                       : -
user_name                      : -
email                          : -
mobile_no                      : -
menu_json                      : -
role_oid                       : -
user_photo_path                : -
status                         : -
reset_required                 : -
login_oid                      : -
trace_id                       : -
created_by                     : -
created_on                     : -
updated_by                     : -
updated_on                     : -
*/
create table                   "wild_snap".login_history
(
oid                            varchar(128)                                                not null,
login_id                       varchar(128)                                                not null,
password                       varchar(256)                                                not null,
user_name                      varchar(128)                                                not null,
email                          varchar(256),
mobile_no                      varchar(64),
menu_json                      text,
role_oid                       varchar(128)                                                not null,
user_photo_path                varchar(512),
status                         varchar(128),
reset_required                 varchar(32),
login_oid                      varchar(128)                                                not null,
trace_id                       varchar(128),
created_by                     varchar(128)                                                not null       default 'System',
created_on                     timestamp                                                   not null       default current_timestamp,
updated_by                     varchar(128),
updated_on                     timestamp,
constraint                     pk_login_history                                            primary key    (oid),
constraint                     fk_role_oid_login_history                                   foreign key    (role_oid)
                                                                                           references     "wild_snap".role(oid),
constraint                     fk_login_oid_login_history                                  foreign key    (login_oid)
                                                                                           references     "wild_snap".login(oid)
);

/*
-
oid                            : -
access_token                   : -
refresh_token                  : -
login_oid                      : -
signin_time                    : -
sign_out_time                  : -
log_type                       : -
ip_address                     : -
user_id                        : -
location                       : -
status                         : -
created_by                     : -
created_on                     : -
updated_by                     : -
updated_on                     : -
*/
create table                   "wild_snap".login_log
(
oid                            varchar(128)                                                not null,
access_token                   text,
refresh_token                  text,
login_oid                      varchar(128)                                                not null,
signin_time                    timestamp                                                   not null       default current_timestamp,
sign_out_time                  timestamp                                                                  default current_timestamp,
log_type                       varchar(32)                                                 not null       default 'login',
ip_address                     varchar(32),
user_id                        varchar(32),
location                       text,
status                         varchar(32),
created_by                     varchar(128)                                                not null       default 'System',
created_on                     timestamp                                                   not null       default current_timestamp,
updated_by                     varchar(128),
updated_on                     timestamp,
constraint                     pk_login_log                                                primary key    (oid),
constraint                     fk_login_oid_login_log                                      foreign key    (login_oid)
                                                                                           references     "wild_snap".login(oid),
constraint                     ck_log_type_login_log                                       check          (log_type = 'login' or log_type = 'Logout')
);

/*
-
oid                            : -
login_id                       : -
old_password                   : -
new_password                   : -
maker_id                       : -
checker_id                     : -
approver_id                    : -
approved_on                    : -
resetstatus                    : -
created_by                     : -
created_on                     : -
updated_by                     : -
updated_on                     : -
*/
create table                   "wild_snap".password_reset_log
(
oid                            varchar(128)                                                not null,
login_id                       varchar(128)                                                not null,
old_password                   varchar(128)                                                not null,
new_password                   varchar(128)                                                not null,
maker_id                       varchar(128),
checker_id                     varchar(128),
approver_id                    varchar(128),
approved_on                    timestamp                                                                  default current_timestamp,
resetstatus                    varchar(32),
created_by                     varchar(128)                                                not null       default 'System',
created_on                     timestamp                                                   not null       default current_timestamp,
updated_by                     varchar(128),
updated_on                     timestamp                                                                  default current_timestamp,
constraint                     pk_password_reset_log                                       primary key    (oid)
);

/*
-
oid                            : -
registration_id                : -
login_id                       : -
name_en                        : -
name_bn                        : -
email                          : -
mobile_no                      : -
nid                            : -
photo_path                     : -
photo_url                      : -
is_verified                    : -
status                         : -
created_by                     : -
created_on                     : -
updated_by                     : -
updated_on                     : -
*/
create table                   "wild_snap".sign_up
(
oid                            varchar(128)                                                not null,
registration_id                varchar(128)                                                not null,
login_id                       varchar(128)                                                not null,
name_en                        varchar(128)                                                not null,
name_bn                        varchar(256),
email                          varchar(256)                                                not null,
mobile_no                      varchar(256)                                                not null,
nid                            varchar(64),
photo_path                     text,
photo_url                      varchar(512),
is_verified                    varchar(512)                                                               default 'No',
status                         varchar(32),
created_by                     varchar(128)                                                not null       default 'System',
created_on                     timestamp                                                   not null       default current_timestamp,
updated_by                     varchar(128),
updated_on                     timestamp                                                                  default current_timestamp,
constraint                     pk_sign_up                                                  primary key    (oid),
constraint                     uk_registration_id_sign_up                                  unique         (registration_id),
constraint                     ck_status_sign_up                                           check          (status = 'Active' or status = 'Inactive')
);

/*
-
oid                            : -
login_id                       : -
mobile_no                      : -
otp                            : -
otp_status                     : -
otp_verified                   : -
otp_generated_on               : -
otp_expiration_time            : -
otp_request_by                 : -
otp_request_on                 : -
created_by                     : -
created_on                     : -
updated_by                     : -
updated_on                     : -
*/
create table                   "wild_snap".otp
(
oid                            varchar(128)                                                not null,
login_id                       varchar(128)                                                not null,
mobile_no                      varchar(128)                                                not null,
otp                            varchar(128)                                                not null,
otp_status                     varchar(32)                                                                default 'Submitted',
otp_verified                   varchar(32)                                                                default 'No',
otp_generated_on               timestamp                                                   not null,
otp_expiration_time            timestamp                                                   not null,
otp_request_by                 varchar(128),
otp_request_on                 timestamp                                                                  default current_timestamp,
created_by                     varchar(128)                                                not null       default 'System',
created_on                     timestamp                                                   not null       default current_timestamp,
updated_by                     varchar(128),
updated_on                     timestamp,
constraint                     pk_otp                                                      primary key    (oid),
constraint                     ck_otp_status_otp                                           check          (otp_status = 'Submitted' or otp_status = 'OtpSent' or otp_status = 'OtpVerified' or otp_status = 'OtpExpired' or otp_status = 'OtpCancelled'),
constraint                     ck_otp_verified_otp                                         check          (otp_verified = 'Yes' or otp_verified = 'No')
);


