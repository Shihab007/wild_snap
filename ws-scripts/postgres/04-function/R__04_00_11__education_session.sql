

--DROP FUNCTION IF EXISTS configure_single_education_session(varchar(128));
CREATE OR REPLACE FUNCTION configure_single_education_session(p_education_session_oid varchar(128), p_institute_oid varchar(128), p_created_by varchar(128))
RETURNS void AS $configure_single_education_session$
    DECLARE
    	v_education_session			record;
    	v_institute				record;
    	v_institute_session			record;
    	v_institute_session_type		record;
    	v_institute_session_class_group	record;
    	v_institute_class_section		record;
    	v_institute_class_subject		record;
    	v_institute_class_textbook		record;
    	v_education_subject				record;
    	v_education_class_subject		record;
    	v_education_textbook			record;
        v_eiin_oid            		varchar(64);
    	v_institute_session_oid		varchar(128);
    	v_institute_oid  			varchar(128);
    	v_institute_previous_session_oid	varchar(128);
        v_timestamp                     	varchar(128);
    	
    	
    BEGIN
    
       --SELECT to_char(clock_timestamp(), 'YYYYMMDDHH24MISSMS') INTO v_timestamp;
       -- SELECT * INTO v_institute FROM institute WHERE oid = p_institute_oid;
        SELECT * INTO v_education_session FROM education_session WHERE oid = p_education_session_oid;
        --SELECT oid INTO v_institute_previous_session_oid FROM institute_session where education_session_oid = v_education_session.previous_education_session_oid and institute_oid = p_institute_oid;
        
        --SELECT concat('SCHOOL-ERP-', v_institute.eiin_number) INTO v_eiin_oid;
        -- SELECT concat(v_eiin_oid, '-Session-', v_timestamp) INTO v_institute_session_oid;
        
        --should not use
--        SELECT * INTO v_education_subject FROM education_subject 
--        where education_system_oid = v_education_session.education_system_oid 
--        and education_curriculum_oid = v_education_session.education_curriculum_oid;
--       
--        SELECT * INTO v_education_class_subject FROM education_class_subject 
--        where education_session_oid = p_education_session_oid;
--       
--              
--        SELECT * INTO v_education_textbook FROM education_textbook  
--        where education_system_oid = v_education_session.education_system_oid 
--        and education_curriculum_oid = v_education_session.education_curriculum_oid;
       
       -- For each session add eligible institute 
       for v_institute_oid in (select oid from institute i where i.oid = p_institute_oid) loop 
        
			
			--get current timestamp for set up id/oid
			SELECT to_char(clock_timestamp(), 'YYYYMMDDHH24MISSMS') INTO v_timestamp;
		
			--get institute details
			SELECT * INTO v_institute FROM institute WHERE oid = v_institute_oid;
		
			--get previous institute session oid
			SELECT oid INTO v_institute_previous_session_oid 
			FROM institute_session 
			where education_session_oid = v_education_session.previous_education_session_oid 
			and institute_oid = v_institute_oid;
			
			--get eiin oid to set institute session oid
		    SELECT concat('SCHOOL-ERP-', v_institute.eiin_number) INTO v_eiin_oid;
		   
		    	--get institute session oid to set institute session oid
			SELECT concat(v_eiin_oid, '-Session-', v_timestamp) INTO v_institute_session_oid;

			--insert institute_session 
	        INSERT INTO institute_session(oid, name_en, name_bn, education_type_json, status, previous_session_oid, 
	        	next_session_oid, institute_oid, education_session_oid, 
	       		education_system_oid, education_curriculum_oid, created_by) 
	        VALUES(v_institute_session_oid, v_education_session.name_en, v_education_session.name_bn, v_education_session.education_type_json, 
	        	v_education_session.status, v_institute_previous_session_oid, null, v_institute_oid, v_education_session.oid, 
	        	v_education_session.education_system_oid, v_education_session.education_curriculum_oid, p_created_by);
	       
			--update institute_session
	        update institute_session set next_session_oid = v_institute_session_oid where oid = v_institute_previous_session_oid;
	       
			--insert institute_session_education_type
	        for v_institute_session_type in (select ets.name_en, ets.name_bn, et.short_name, et.sort_order, et.status, ets.education_type_oid
			from education_session es, education_type_session ets, institute_type it, education_type et 
			where 1 = 1 
			and es.oid = ets.education_session_oid 
			and it.education_type_oid = ets.education_type_oid 
			and it.institute_oid = v_institute_oid 
			and et.oid = ets.education_type_oid 
			and es.oid = p_education_session_oid) 
			loop 

				INSERT INTO institute_session_education_type(oid, name_en, name_bn, short_name, sort_order, status, education_type_oid, institute_session_oid, created_by) 
				VALUES(concat(v_eiin_oid, '-Ses-Type-', uuid()), v_institute_session_type.name_en, v_institute_session_type.name_bn, v_institute_session_type.short_name, 
			    	v_institute_session_type.sort_order, v_institute_session_type.status, v_institute_session_type.education_type_oid, v_institute_session_oid, p_created_by);
			end loop;
		
			--insert institute_session_class_group
			for v_institute_session_class_group in (select iscg.oid , iscg.institute_class_group_oid ,iscg.institute_class_oid ,iscg.institute_oid ,iscg.created_by 
				from institute_session_class_group iscg 
				where institute_oid = v_institute_oid 
				and institute_session_oid = v_institute_previous_session_oid) 
				loop 

		        	INSERT INTO schoolerp.institute_session_class_group(oid, institute_class_group_oid, institute_class_oid, institute_session_oid, institute_oid, created_by)
					VALUES(concat(v_eiin_oid, '-Ses-Class-Group-', uuid()), v_institute_session_class_group.institute_class_group_oid, v_institute_session_class_group.institute_class_oid, 
						v_institute_session_oid, v_institute_oid, p_created_by);
			end loop;
		
			--insert institute_class_section
			for v_institute_class_section in (select ics.oid ,ics.name_en, ics.name_bn, ics.institute_class_oid, 
					ics.institute_class_group_oid, ics.institute_shift_oid, ics.institute_version_oid , ics.status  
				from institute_class_section ics  
				where institute_oid = v_institute_oid 
				and institute_session_oid = v_institute_previous_session_oid) 
				loop 

		        	INSERT INTO schoolerp.institute_class_section(oid, name_en, name_bn, institute_oid, institute_session_oid, institute_class_oid, institute_class_group_oid,
		        		institute_shift_oid, institute_version_oid, status, created_by)
					VALUES(concat(v_eiin_oid, '-Class-Section-', uuid()), v_institute_class_section.name_en, v_institute_class_section.name_bn, v_institute_oid, v_institute_session_oid, 
						v_institute_class_section.institute_class_oid, v_institute_class_section.institute_class_group_oid, v_institute_class_section.institute_shift_oid,	
						v_institute_class_section.institute_version_oid, v_institute_class_section.status, p_created_by);
		
			end loop;
		
			--insert institute_subject
			for v_education_subject in (select "oid", name_en, name_bn, subject_code, subject_type, status, education_system_oid, education_curriculum_oid 
				from education_subject 
				where oid not in (select education_subject_oid from institute_subject where institute_oid = v_institute_oid)
				and education_system_oid = v_education_session.education_system_oid 
			and education_curriculum_oid = v_education_session.education_curriculum_oid) 
				loop 
				
					INSERT INTO schoolerp.institute_subject
						("oid", name_en, name_bn, subject_code, subject_type, status, education_subject_oid, institute_oid, created_by)
					VALUES(concat(v_eiin_oid, '-Institute-Subject-', uuid()), v_education_subject.name_en, v_education_subject.name_bn, v_education_subject.subject_code, 
						v_education_subject.subject_type, v_education_subject.status, v_education_subject.oid, v_institute_oid, p_created_by);
		
			end loop;
		
			--insert institute_class_subject
			for v_education_class_subject in (SELECT "oid", education_subject_oid, education_session_oid, education_group_oid, education_class_oid, subject_code, subject_type, status
				from education_class_subject 
				where education_session_oid = p_education_session_oid
				and education_system_oid  = v_education_session.education_system_oid 
			and education_curriculum_oid = v_education_session.education_curriculum_oid
			and education_class_oid  in (select ec."oid"  from education_class ec , institute_type it 
					where 1=1 
					and ec.education_type_oid = it.education_type_oid 
					and it.institute_oid = v_institute_oid)) 
				loop 
				
					INSERT INTO schoolerp.institute_class_subject ("oid", education_subject_oid, institute_oid, institute_session_oid, institute_class_group_oid, institute_class_oid, 
						subject_code, subject_type, status, created_by)
					VALUES(concat(v_eiin_oid, '-Institute-Class-Subject-', uuid()), v_education_class_subject.education_subject_oid, v_institute_oid, v_institute_session_oid, null, 
							(select ic.oid from institute_class ic 
							where ic.education_class_oid = v_education_class_subject.education_class_oid
							and institute_oid = v_institute_oid), 
						v_education_class_subject.subject_code, v_education_class_subject.subject_type, v_education_class_subject.status, p_created_by);
		
			end loop;
		
			--insert institute_class_textbook
			for v_education_textbook in (SELECT "oid", name_en, name_bn, subject_code, e_book_link, textbook_type, mnemonic, status, 
				education_subject_oid, education_session_oid, education_version_oid, education_group_oid, education_class_oid
				FROM schoolerp.education_textbook	
				where education_session_oid = p_education_session_oid
				and education_class_oid  in (select ec."oid"  from education_class ec , institute_type it 
					where 1=1 
					and ec.education_type_oid = it.education_type_oid 
					and it.institute_oid = v_institute_oid)
				and education_version_oid in (select iv.education_version_oid  from institute_version iv  
					where 1=1
					and iv.institute_oid = v_institute_oid)) 
				loop 
		        	
		        	INSERT INTO schoolerp.institute_class_textbook
						(oid, name_en, name_bn, subject_code, e_book_link, textbook_type, mnemonic, status, institute_oid, institute_session_oid, institute_version_oid, institute_class_group_oid,
					 	institute_class_oid, education_textbook_oid, education_subject_oid, created_by)
					VALUES(concat(v_eiin_oid, '-Class-Textbook-',uuid()), v_education_textbook.name_en, v_education_textbook.name_bn, v_education_textbook.subject_code, 
						v_education_textbook.e_book_link, v_education_textbook.textbook_type, v_education_textbook.mnemonic, v_education_textbook.status, 
						v_institute_oid, v_institute_session_oid, (select iv.oid from institute_version iv 
								where iv.education_version_oid = v_education_textbook.education_version_oid
								and iv.education_curriculum_oid = v_education_session.education_curriculum_oid
								and iv.institute_oid = v_institute_oid) ,
						null , (select ic.oid from institute_class ic 
															where ic.education_class_oid = v_education_textbook.education_class_oid
															and institute_oid = v_institute_oid), 
						v_education_textbook.oid, v_education_textbook.education_subject_oid, p_created_by);
		
			end loop;

				 
		end loop;
      
	
	
    END;
$configure_single_education_session$ LANGUAGE plpgsql;
-- SELECT configure_single_education_session('10', '10');


CREATE OR REPLACE FUNCTION schoolerp.configure_all_education_session(p_education_session_oid character varying, p_created_by character varying)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
    DECLARE
    	v_education_session			record;
    	v_institute				record;
    	v_institute_session			record;
    	v_institute_session_type		record;
    	v_institute_session_class_group	record;
    	v_institute_class_section		record;
    	v_institute_class_subject		record;
    	v_institute_class_textbook		record;
    	v_education_subject				record;
    	v_education_class_subject		record;
    	v_education_textbook			record;
        v_eiin_oid            		varchar(64);
    	v_institute_session_oid		varchar(128);
    	v_institute_oid  			varchar(128);
    	v_institute_previous_session_oid	varchar(128);
        v_timestamp                     	varchar(128);
    	
    	
    BEGIN
    
       --SELECT to_char(clock_timestamp(), 'YYYYMMDDHH24MISSMS') INTO v_timestamp;
       -- SELECT * INTO v_institute FROM institute WHERE oid = p_institute_oid;
        SELECT * INTO v_education_session FROM education_session WHERE oid = p_education_session_oid;
        --SELECT oid INTO v_institute_previous_session_oid FROM institute_session where education_session_oid = v_education_session.previous_education_session_oid and institute_oid = p_institute_oid;
        
        --SELECT concat('SCHOOL-ERP-', v_institute.eiin_number) INTO v_eiin_oid;
        -- SELECT concat(v_eiin_oid, '-Session-', v_timestamp) INTO v_institute_session_oid;
        
        --should not use
--        SELECT * INTO v_education_subject FROM education_subject 
--        where education_system_oid = v_education_session.education_system_oid 
--        and education_curriculum_oid = v_education_session.education_curriculum_oid;
--       
--        SELECT * INTO v_education_class_subject FROM education_class_subject 
--        where education_session_oid = p_education_session_oid;
--       
--              
--        SELECT * INTO v_education_textbook FROM education_textbook  
--        where education_system_oid = v_education_session.education_system_oid 
--        and education_curriculum_oid = v_education_session.education_curriculum_oid;
       
       -- For each session add eligible institute 
       for v_institute_oid in (select distinct(is2.institute_oid)  
		from education_type_session ets, institute_type it, institute_session is2 
		where is2.institute_oid  not in (select institute_oid from institute_session where education_session_oid = p_education_session_oid) 
		and it.education_type_oid = ets.education_type_oid 
		and ets.education_session_oid = p_education_session_oid) loop 
        
			
			--get current timestamp for set up id/oid
			SELECT to_char(clock_timestamp(), 'YYYYMMDDHH24MISSMS') INTO v_timestamp;
		
			--get institute details
		SELECT * INTO v_institute FROM institute WHERE oid = v_institute_oid;
	
		--get previous institute session oid
		SELECT oid INTO v_institute_previous_session_oid 
		FROM institute_session 
		where education_session_oid = v_education_session.previous_education_session_oid 
		and institute_oid = v_institute_oid;
		
		--get eiin oid to set institute session oid
	    	SELECT concat('SCHOOL-ERP-', v_institute.eiin_number) INTO v_eiin_oid;
	   
	    	--get institute session oid to set institute session oid
		SELECT concat(v_eiin_oid, '-Session-', v_timestamp) INTO v_institute_session_oid;

			--insert institute_session 
	        INSERT INTO institute_session(oid, name_en, name_bn, education_type_json, status, previous_session_oid, 
	        	next_session_oid, institute_oid, education_session_oid, 
	       		education_system_oid, education_curriculum_oid, created_by) 
	        VALUES(v_institute_session_oid, v_education_session.name_en, v_education_session.name_bn, v_education_session.education_type_json, 
	        	v_education_session.status, v_institute_previous_session_oid, null, v_institute_oid, v_education_session.oid, 
	        	v_education_session.education_system_oid, v_education_session.education_curriculum_oid, p_created_by);
	       
			--update institute_session
	        update institute_session set next_session_oid = v_institute_session_oid where oid = v_institute_previous_session_oid;
	       
			--insert institute_session_education_type
	        for v_institute_session_type in (select ets.name_en, ets.name_bn, et.short_name, et.sort_order, et.status, ets.education_type_oid
			from education_session es, education_type_session ets, institute_type it, education_type et 
			where 1 = 1 
			and es.oid = ets.education_session_oid 
			and it.education_type_oid = ets.education_type_oid 
			and it.institute_oid = v_institute_oid 
			and et.oid = ets.education_type_oid 
			and es.oid = p_education_session_oid) 
			loop 

				INSERT INTO institute_session_education_type(oid, name_en, name_bn, short_name, sort_order, status, education_type_oid, institute_session_oid, created_by) 
				VALUES(concat(v_eiin_oid, '-Ses-Type-', uuid()), v_institute_session_type.name_en, v_institute_session_type.name_bn, v_institute_session_type.short_name, 
			    	v_institute_session_type.sort_order, v_institute_session_type.status, v_institute_session_type.education_type_oid, v_institute_session_oid, p_created_by);
			end loop;
		
			--insert institute_session_class_group
			for v_institute_session_class_group in (select iscg.oid , iscg.institute_class_group_oid ,iscg.institute_class_oid ,iscg.institute_oid ,iscg.created_by 
				from institute_session_class_group iscg 
				where institute_oid = v_institute_oid 
				and institute_session_oid = v_institute_previous_session_oid) 
				loop 

		        	INSERT INTO schoolerp.institute_session_class_group(oid, institute_class_group_oid, institute_class_oid, institute_session_oid, institute_oid, created_by)
					VALUES(concat(v_eiin_oid, '-Ses-Class-Group-', uuid()), v_institute_session_class_group.institute_class_group_oid, v_institute_session_class_group.institute_class_oid, 
						v_institute_session_oid, v_institute_oid, p_created_by);
			end loop;
		
			--insert institute_class_section
			for v_institute_class_section in (select ics.oid ,ics.name_en, ics.name_bn, ics.institute_class_oid, 
					ics.institute_class_group_oid, ics.institute_shift_oid, ics.institute_version_oid , ics.status  
				from institute_class_section ics  
				where institute_oid = v_institute_oid 
				and institute_session_oid = v_institute_previous_session_oid) 
				loop 

		        	INSERT INTO schoolerp.institute_class_section(oid, name_en, name_bn, institute_oid, institute_session_oid, institute_class_oid, institute_class_group_oid,
		        		institute_shift_oid, institute_version_oid, status, created_by)
					VALUES(concat(v_eiin_oid, '-Class-Section-', uuid()), v_institute_class_section.name_en, v_institute_class_section.name_bn, v_institute_oid, v_institute_session_oid, 
						v_institute_class_section.institute_class_oid, v_institute_class_section.institute_class_group_oid, v_institute_class_section.institute_shift_oid,	
						v_institute_class_section.institute_version_oid, v_institute_class_section.status, p_created_by);
		
			end loop;
		
			--insert institute_subject
			for v_education_subject in (select "oid", name_en, name_bn, subject_code, subject_type, status, education_system_oid, education_curriculum_oid 
				from education_subject 
				where oid not in (select education_subject_oid from institute_subject where institute_oid = v_institute_oid)
				and education_system_oid = v_education_session.education_system_oid 
			and education_curriculum_oid = v_education_session.education_curriculum_oid) 
				loop 
				
					INSERT INTO schoolerp.institute_subject
						("oid", name_en, name_bn, subject_code, subject_type, status, education_subject_oid, institute_oid, created_by)
					VALUES(concat(v_eiin_oid, '-Institute-Subject-', uuid()), v_education_subject.name_en, v_education_subject.name_bn, v_education_subject.subject_code, 
						v_education_subject.subject_type, v_education_subject.status, v_education_subject.oid, v_institute_oid, p_created_by);
		
			end loop;
		
			--insert institute_class_subject
			for v_education_class_subject in (SELECT "oid", education_subject_oid, education_session_oid, education_group_oid, education_class_oid, subject_code, subject_type, status
				from education_class_subject 
				where education_session_oid = p_education_session_oid
				and education_system_oid  = v_education_session.education_system_oid 
			and education_curriculum_oid = v_education_session.education_curriculum_oid
			and education_class_oid  in (select ec."oid"  from education_class ec , institute_type it 
					where 1=1 
					and ec.education_type_oid = it.education_type_oid 
					and it.institute_oid = v_institute_oid)) 
				loop 
				
					INSERT INTO schoolerp.institute_class_subject ("oid", education_subject_oid, institute_oid, institute_session_oid, institute_class_group_oid, institute_class_oid, 
						subject_code, subject_type, status, created_by)
					VALUES(concat(v_eiin_oid, '-Institute-Class-Subject-', uuid()), v_education_class_subject.education_subject_oid, v_institute_oid, v_institute_session_oid, null, 
							(select ic.oid from institute_class ic 
							where ic.education_class_oid = v_education_class_subject.education_class_oid
							and institute_oid = v_institute_oid), 
						v_education_class_subject.subject_code, v_education_class_subject.subject_type, v_education_class_subject.status, p_created_by);
		
			end loop;
		
			--insert institute_class_textbook
			for v_education_textbook in (SELECT "oid", name_en, name_bn, subject_code, e_book_link, textbook_type, mnemonic, status, 
				education_subject_oid, education_session_oid, education_version_oid, education_group_oid, education_class_oid
				FROM schoolerp.education_textbook	
				where education_session_oid = p_education_session_oid
				and education_class_oid  in (select ec."oid"  from education_class ec , institute_type it 
					where 1=1 
					and ec.education_type_oid = it.education_type_oid 
					and it.institute_oid = v_institute_oid)
				and education_version_oid in (select iv.education_version_oid  from institute_version iv  
					where 1=1
					and iv.institute_oid = v_institute_oid)) 
				loop 
		        	
		        	INSERT INTO schoolerp.institute_class_textbook
						(oid, name_en, name_bn, subject_code, e_book_link, textbook_type, mnemonic, status, institute_oid, institute_session_oid, institute_version_oid, institute_class_group_oid,
					 	institute_class_oid, education_textbook_oid, education_subject_oid, created_by)
					VALUES(concat(v_eiin_oid, '-Class-Textbook-',uuid()), v_education_textbook.name_en, v_education_textbook.name_bn, v_education_textbook.subject_code, 
						v_education_textbook.e_book_link, v_education_textbook.textbook_type, v_education_textbook.mnemonic, v_education_textbook.status, 
						v_institute_oid, v_institute_session_oid, (select iv.oid from institute_version iv 
								where iv.education_version_oid = v_education_textbook.education_version_oid
								and iv.education_curriculum_oid = v_education_session.education_curriculum_oid
								and iv.institute_oid = v_institute_oid) ,
						null , (select ic.oid from institute_class ic 
															where ic.education_class_oid = v_education_textbook.education_class_oid
															and institute_oid = v_institute_oid), 
						v_education_textbook.oid, v_education_textbook.education_subject_oid, p_created_by);
		
			end loop;

				 
		end loop;
      
	
	
    END;
$function$
;







