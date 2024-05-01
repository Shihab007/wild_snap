/*
-
oid                            : -
image_url                      : -
image_path                     : -
image_name                     : -
image_description              : -
links                          : -
created_by                     : -
created_on                     : -
updated_by                     : -
updated_on                     : -
*/
create table                   "wild_snap".animal_data
(
oid                            varchar(128)                                                not null,
image_url                      varchar(128),
image_path                     varchar(128),
image_name                     varchar(128),
image_description              varchar(32),
links                          varchar(32),
created_by                     varchar(128)                                                not null       default 'System',
created_on                     timestamp                                                   not null       default current_timestamp,
updated_by                     varchar(128),
updated_on                     timestamp,
constraint                     pk_animal_data                                              primary key    (oid)
);

/*
-
oid                            : -
image_url                      : -
image_path                     : -
image_name                     : -
image_description              : -
created_by                     : -
created_on                     : -
updated_by                     : -
updated_on                     : -
*/
create table                   "wild_snap".uploaded_image
(
oid                            varchar(128)                                                not null,
image_url                      varchar(128),
image_path                     varchar(128),
image_name                     varchar(128),
image_description              varchar(32),
created_by                     varchar(128)                                                not null       default 'System',
created_on                     timestamp                                                   not null       default current_timestamp,
updated_by                     varchar(128),
updated_on                     timestamp,
constraint                     pk_uploaded_image                                           primary key    (oid)
);


