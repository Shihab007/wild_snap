--DROP FUNCTION IF EXISTS uuid();
CREATE OR REPLACE FUNCTION uuid()
RETURNS varchar(64) AS $uuid$
    BEGIN
		RETURN (SELECT to_char(clock_timestamp(), 'YYYYMMDDHH24MISSMS') || '-' || uuid_in(overlay(overlay(md5(random()::text || ':' || clock_timestamp()::text) placing '4' FROM 13) placing to_hex(floor(random()*(11-8+1) + 8)::int)::text FROM 17)::cstring));
    END;
$uuid$ language plpgsql;
--select uuid();


--DROP FUNCTION IF EXISTS addDayToDay();
CREATE OR REPLACE FUNCTION addDayToDay()
RETURNS text AS $addDayToDay$
    BEGIN
		--RETURN (select now() + interval '"'+day+'" Day');
		RETURN (select to_char((now() + interval '10 Day'), 'YYYY-MM-DD'));
    END;
$addDayToDay$ language plpgsql;
--select addDayToDay();


--DROP FUNCTION IF EXISTS random_number();
CREATE OR REPLACE FUNCTION random_number()
RETURNS INT AS $random_number$
    BEGIN
		RETURN floor(random() * (999999) + 1);
    END;
$random_number$ language plpgsql;
--select random_number();


--DROP FUNCTION IF EXISTS random_number();
CREATE OR REPLACE FUNCTION random_between(low INT, high INT)
RETURNS INT AS $random_between$
    BEGIN
		RETURN floor(random() * (high-low + 1) + low);
    END;
$random_between$ language plpgsql;
--select random_between(1, 100000);

--This function use for get all address information by using json string--
create or replace function get_full_address(address text)
 returns json
 language plpgsql
 as 
 $$ 
 declare 
 	v_thana record;
 	v_district record;
	v_address_obj json;
 begin 
	 
	select t.name_en as thanaNameEn, t.name_bn as thanaNameBn into v_thana from thana t where t.oid = address::json->>'thanaOid';
 	select d.name_en as districtNameEn, d.name_bn as districtNameBn into v_district from district d where d.oid = address::json->>'districtOid';

	SELECT JSON_BUILD_OBJECT(
			    'careOf', address::json->>'careOf',
			    'houseNo', address::json->>'houseNo',
			    'roadNo', address::json->>'roadNo',
			    'villageOrWord', address::json->>'villageOrWord',
			    'postOffice', address::json->>'postOffice',
			    'postcode', address::json->>'postcode',
			    'thanaOid', address::json->>'thanaOid',
			    'thanaNameEn', v_thana.thanaNameEn,
			    'thanaNameBn', v_thana.thanaNameBn,
			    'districtOid', address::json->>'districtOid',
			    'districtNameEn', v_district.districtNameEn,
			    'districtNameBn', v_district.districtNameBn
			) INTO v_address_obj;
		
		return v_address_obj;
 	end 
 	$$
--end get_full_address function--
 	
