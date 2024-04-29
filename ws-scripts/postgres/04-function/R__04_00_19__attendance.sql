-- DROP FUNCTION schoolerp.biometric_attendance_entry();

CREATE OR REPLACE FUNCTION schoolerp.biometric_attendance_entry()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
declare 
 	v_section_student record;
 	v_eiin varchar(128);
 	v_student record;
 	v_attendance_oid varchar(128);
 	v_attendance_id varchar(128);
 	v_student_id varchar(128);
 	v_attendance_date date;
    v_serial_no int4;
    v_is_user_role varchar(128);
   	v_section_teacher record;
   	v_teacher record;
   	v_teacher_id varchar(128);
   	v_teacher_login_id varchar(128);
begin
	select concat('0',new.user_id) into v_teacher_login_id;

	SELECT substring(l.role_oid,12) into v_is_user_role FROM login l WHERE l.login_id = v_teacher_login_id;
	
	select concat(substring('10390522060001',0,9),'_',substring('10390522060001',9,15))  into v_student_id;

	
	if v_is_user_role is null then
--		RAISE NOTICE 'Student Id  = % ',v_student_id;
		SELECT substring(l.role_oid,12) into v_is_user_role FROM login l WHERE l.login_id like v_student_id;
	end if;
		
--	select concat(substring(new.user_id,0,9),'_',substring(new.user_id,9,15)) into v_student_id;
	select (substring(new.attendance_time::varchar,0,11)::date)	into v_attendance_date;
	select i.eiin_number into v_eiin from institute i where i.oid =new.institute_oid;
	
--	RAISE NOTICE 'I want to print Teacher or Student Id  = % attendance_date = %', new.user_id, v_attendance_date;

	----------------------------------------------------- 
	-----------------------For Student-------------------
	-----------------------------------------------------STUDENT
	raise notice 'user role == %', v_is_user_role;
	if v_is_user_role = 'STUDENT' then
		raise notice '-------------------------------Hey I am colling from student -------------------------------------';
	-- get student info
		select * into v_student from student s where s.student_id like v_student_id;				
		--check if student attendance exists
			select (select sa."oid" 
			from student_attendance sa 
			left join student s on s.institute_oid = sa.institute_oid 
			where 1=1
			and sa.institute_oid = s.institute_oid 
			and sa.institute_session_oid = s.institute_session_oid 
			and sa.institute_class_oid = s.institute_class_oid 
			and sa.institute_class_section_oid = s.institute_class_section_oid 
			and sa.institute_shift_oid = s.institute_shift_oid 
			and sa.institute_version_oid = s.institute_version_oid 
			and s.student_id  like v_student_id
			and (( s.institute_class_group_oid is null and sa.institute_class_group_oid is null) or sa.institute_class_group_oid =s.institute_class_group_oid )
			and sa.attendance_date = v_attendance_date )into v_attendance_oid;
		--print
		RAISE NOTICE 'I want to print from student attendance oid % ', v_attendance_oid;
		--if does not exists create a new one
		v_serial_no := 0;
		if v_attendance_oid is null then 
				--insert into attendance
				select concat(v_eiin,'-attendance-',to_char(clock_timestamp(), 'YYYYMMDDHH24MISSMS')) into v_attendance_oid;
				INSERT INTO student_attendance
						("oid", attendance_date, institute_oid, institute_session_oid, institute_class_oid, institute_class_section_oid, 
						institute_class_group_oid, institute_shift_oid, institute_version_oid)
						VALUES(v_attendance_oid, v_attendance_date, v_student.institute_oid, v_student.institute_session_oid, 
						v_student.institute_class_oid, v_student.institute_class_section_oid,
						v_student.institute_class_group_oid, v_student.institute_shift_oid, v_student.institute_version_oid);
				--insert into attendance details 
				for v_section_student in (select sa.student_id , sa."oid" 
						from student sa 
						left join student s on s.institute_oid = sa.institute_oid 
						where 1=1
						and sa.institute_oid = s.institute_oid 
						and sa.institute_session_oid = s.institute_session_oid 
						and sa.institute_class_oid = s.institute_class_oid 
						and sa.institute_class_section_oid = s.institute_class_section_oid 
						and sa.institute_shift_oid = s.institute_shift_oid 
						and sa.institute_version_oid = s.institute_version_oid 
						and s.student_id like v_student_id
						and (( s.institute_class_group_oid is null and sa.institute_class_group_oid is null) or sa.institute_class_group_oid =s.institute_class_group_oid )) loop
								v_serial_no := v_serial_no + 1;
								INSERT INTO student_attendance_detail
								("oid", student_id, student_oid, student_attendance_oid, status, institute_oid)
								VALUES(concat(v_eiin,'-attendance-detail-',to_char(clock_timestamp(), 'YYYYMMDDHH24MISSMS'),v_serial_no), v_section_student.student_id,
								v_section_student.oid, v_attendance_oid, 'Absent', new.institute_oid);
				end loop;
				
		end if;
		--update student attendance info
		update student_attendance_detail
		set status='Present'
		where student_attendance_oid = v_attendance_oid
		and student_id like v_student_id;
	
	----------------------------------------------------- 
	-----------------------For Teacher-------------------
	-----------------------------------------------------
	elsif v_is_user_role = 'TEACHER' then
		raise notice '-------------------------------Hey I am colling from Teacher -------------------------------------';
	
		-- get Teacher info
		select * into v_teacher from teacher t where  t.login_id = v_teacher_login_id;	
		raise notice 'teacher oid =%',v_teacher.oid;
	--check if teacher attendance exists
		select (select ta.oid 
			from teacher_attendance ta 
			left join teacher t on ta.institute_oid = t.institute_oid
			where 1 = 1
			and ta.attendance_date = v_attendance_date limit 1) 
			into v_attendance_oid;
		
		--print
		RAISE NOTICE 'I want to print from teacher attendance oid % ', v_attendance_oid;
		v_serial_no := 0;
	
		if v_attendance_oid is null then 
			--insert into attendance
			select concat(v_eiin,'-attendance-',to_char(clock_timestamp(), 'YYYYMMDDHH24MISSMS')) into v_attendance_oid;
			select concat('attendance-',to_char(clock_timestamp(), 'YYYYMMDDHH24MISSMS')) into v_attendance_id;
		
			insert into teacher_attendance(oid, attendance_id, attendance_date, institute_oid)
			values(v_attendance_oid,v_attendance_id, v_attendance_date, new.institute_oid);
		
			--insert into attendance details 
			for v_section_teacher in (select t.oid, t.teacher_id, t.login_id from teacher t where t.institute_oid  = new.institute_oid) loop
				v_serial_no := v_serial_no + 1;
				insert into teacher_attendance_detail(oid, teacher_id, teacher_oid, teacher_attendance_oid, status, institute_oid) 
				values(concat(v_eiin,'-attendance-detail-',to_char(clock_timestamp(), 'YYYYMMDDHH24MISSMS'),v_serial_no), v_section_teacher.teacher_id, 
				v_section_teacher.oid, v_attendance_oid, 'Absent', new.institute_oid);
			end loop;
		
		end if;
		
		--update Teacher attendance info
		update teacher_attendance_detail
		set status='Present', in_time = new.attendance_time
		where  teacher_attendance_oid = v_attendance_oid and teacher_oid = v_teacher.oid;

	end if;
	
	RETURN NEW;
END;
$function$
;

