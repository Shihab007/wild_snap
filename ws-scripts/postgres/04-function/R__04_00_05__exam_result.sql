
CREATE OR REPLACE FUNCTION prepare_result_by_text_book(p_data text)
RETURNS void AS $prepare_result_by_class_text_book$
    DECLARE
        v_start_marks             		int4;
        v_end_marks             		int4;
        v_obtained_marks             		int4;
        v_check_section             		int4;
    	v_student				record;	
    	v_grade_detail				record;	
    	v_class_section				record;	
        v_grading_system_oid                    varchar(128);	
        v_json                          	json;	
    BEGIN
        SELECT p_data::json INTO v_json;
    
        select grading_system_oid into v_grading_system_oid from schoolerp.exam_class where 1 = 1 and institute_class_oid = v_json->>'instituteClassOid' and exam_oid = v_json->>'examOid' limit 1;
      
        
        for v_class_section in (select distinct(institute_class_section_oid) from schoolerp.exam_result_marks where class_textbook_oid = v_json->>'textBookOid' 
        and institute_class_oid = v_json->>'instituteClassOid') loop 
        
		select count(oid) into v_check_section from exam_result_detail where exam_oid = v_json->>'examOid' and institute_class_oid = v_json->>'instituteClassOid' 
		and institute_class_section_oid = v_class_section.institute_class_section_oid;
		
		IF v_check_section < 1 THEN
		INSERT INTO schoolerp.exam_result_detail(oid, exam_oid, exam_result_oid, institute_oid, institute_session_oid, institute_class_oid, institute_class_group_oid, 
		institute_class_section_oid, institute_shift_oid, institute_version_oid, grading_system_oid, status, created_by) VALUES(uuid(), v_json->>'examOid', 
		(select oid from exam_result where exam_oid = v_json->>'examOid'), (select institute_oid from exam_result where exam_oid = v_json->>'examOid'), 
		(select institute_session_oid from exam_result where exam_oid = v_json->>'examOid'), v_json->>'instituteClassOid', 
		(select institute_class_group_oid from institute_class_section where oid = v_class_section.institute_class_section_oid), v_class_section.institute_class_section_oid,
		(select institute_shift_oid from institute_class_section where oid = v_class_section.institute_class_section_oid), v_json->>'instituteVersionOid', v_grading_system_oid,
		'Pending', v_json->>'createdBy');
		
		END IF;
	end loop;
        
	for v_student in (SELECT oid, obtained_marks, institute_class_section_oid  FROM schoolerp.exam_result_marks where exam_oid = v_json->>'examOid' and class_textbook_oid = v_json->>'textBookOid') loop
				
		select v_student.obtained_marks::int4 into v_obtained_marks;			
		for v_grade_detail in (select start_marks, end_marks, letter_grade, grade_point, assessment from schoolerp.institute_grading_system_detail 
			where institute_grading_system_oid = v_grading_system_oid) loop
			select v_grade_detail.start_marks::int4 into v_start_marks;
			select v_grade_detail.end_marks::int4 into v_end_marks;
			if (v_obtained_marks > (v_start_marks-1) and v_obtained_marks < (v_end_marks+1))  
		    then
			update schoolerp.exam_result_marks set exam_result_detail_oid = (select oid from exam_result_detail where exam_oid = v_json->>'examOid' 
			and institute_class_section_oid = v_student.institute_class_section_oid), letter_grade = v_grade_detail.letter_grade, 
			grade_point = v_grade_detail.grade_point, assessment = v_grade_detail.assessment where oid = v_student.oid;
		
		    end if; 
		end loop;
	end loop;
    END;
$prepare_result_by_class_text_book$ LANGUAGE plpgsql;
-- SELECT prepare_result_by_class_text_book('10');




CREATE OR REPLACE FUNCTION prepare_result_by_subject(p_data text)
RETURNS void AS $prepare_result_by_subject$
    DECLARE
        v_start_marks             		int4;
        v_end_marks             		int4;
        v_obtained_marks             		int4;
        v_check_section             		int4;
    	v_student				record;	
    	v_grade_detail				record;	
    	v_class_section				record;	
        v_grading_system_oid                    varchar(128);	
        v_json                          	json;	
    BEGIN
        SELECT p_data::json INTO v_json;
    
        select grading_system_oid into v_grading_system_oid from schoolerp.exam_class where 1 = 1 and institute_class_oid = v_json->>'instituteClassOid' and exam_oid = v_json->>'examOid' limit 1;
      
        
        for v_class_section in (select distinct(institute_class_section_oid) from schoolerp.exam_result_marks where education_subject_oid = v_json->>'educationSubjectOid' 
        and institute_class_oid = v_json->>'instituteClassOid') loop 
        
		select count(oid) into v_check_section from exam_result_detail where exam_oid = v_json->>'examOid' and institute_class_oid = v_json->>'instituteClassOid' 
		and institute_class_section_oid = v_class_section.institute_class_section_oid;
		
		IF v_check_section < 1 THEN
		INSERT INTO schoolerp.exam_result_detail(oid, exam_oid, exam_result_oid, institute_oid, institute_session_oid, institute_class_oid, institute_class_group_oid, 
		institute_class_section_oid, institute_shift_oid, institute_version_oid, grading_system_oid, status, created_by) VALUES(uuid(), v_json->>'examOid', 
		(select oid from exam_result where exam_oid = v_json->>'examOid'), (select institute_oid from exam_result where exam_oid = v_json->>'examOid'), 
		(select institute_session_oid from exam_result where exam_oid = v_json->>'examOid'), v_json->>'instituteClassOid', 
		(select institute_class_group_oid from institute_class_section where oid = v_class_section.institute_class_section_oid), v_class_section.institute_class_section_oid,
		(select institute_shift_oid from institute_class_section where oid = v_class_section.institute_class_section_oid), v_json->>'instituteVersionOid', v_grading_system_oid,
		'Pending', v_json->>'createdBy');
		
		END IF;
	end loop;
        
	for v_student in (SELECT oid, obtained_marks, institute_class_section_oid  FROM schoolerp.exam_result_marks where exam_oid = v_json->>'examOid' 
	and education_subject_oid = v_json->>'educationSubjectOid') loop
				
		select v_student.obtained_marks::int4 into v_obtained_marks;			
		for v_grade_detail in (select start_marks, end_marks, letter_grade, grade_point, assessment from schoolerp.institute_grading_system_detail 
			where institute_grading_system_oid = v_grading_system_oid) loop
			select v_grade_detail.start_marks::int4 into v_start_marks;
			select v_grade_detail.end_marks::int4 into v_end_marks;
			if (v_obtained_marks > (v_start_marks-1) and v_obtained_marks < (v_end_marks+1))  
		    then
			update schoolerp.exam_result_marks set exam_result_detail_oid = (select oid from exam_result_detail where exam_oid = v_json->>'examOid' 
			and institute_class_section_oid = v_student.institute_class_section_oid), letter_grade = v_grade_detail.letter_grade, 
			grade_point = v_grade_detail.grade_point, assessment = v_grade_detail.assessment where oid = v_student.oid;
		
		    end if; 
		end loop;
	end loop;
    END;
$prepare_result_by_subject$ LANGUAGE plpgsql;
-- SELECT prepare_result_by_subject('10');


CREATE OR REPLACE FUNCTION exam_result_calculation(p_exam_oid character varying, p_institute_oid character varying, p_institute_class_oid character varying, p_education_subject_oid character varying)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
    DECLARE
    	v_exam_result_mark_list			record;
    	v_exam_result_mark				record;	
    	v_assignment_marks float;
	 	v_class_test_marks float;
	 	v_attendance_marks float;
	 	v_subject_total_marks float;
	 	v_obtained_marks float;
	 	v_obtained_marks_contribution float;
	 	v_total_obtained_marks float;
	 	v_grade_point float;
	 	v_letter_grade varchar(128);
	 	v_assessment varchar(128);
    BEGIN
	    
	    for v_exam_result_mark in (select erm.oid , erm.institute_class_term_oid ,erm.student_id ,
	    							erm.written_marks , erm.mcq_marks ,erm.lab_marks , erm.viva_marks ,erm.other_marks 
									from exam_result_marks erm 
									where erm.exam_oid =p_exam_oid
									and erm.institute_oid =p_institute_oid
									and erm.institute_class_oid =p_institute_class_oid
									and erm.education_subject_oid =p_education_subject_oid) loop
										
			-- for every student loop starts
			-- assignment mark
			select coalesce ((select (round(AVG(am.obtained_mark / ass.total_mark),2) * (select ics.assignment_contribution  
					from institute_class_setting ics
					where ics.institute_session_oid = ass.institute_session_oid and ics.institute_class_oid = ass.institute_class_oid) )
					from assignment ass 
					left join assignment_mark am on ass.oid = am.assignment_oid
					where ass.term_oid = v_exam_result_mark.institute_class_term_oid and am.student_id = v_exam_result_mark.student_id
					group by ass.institute_session_oid , ass.institute_class_oid),0) into v_assignment_marks;
			-- class test mark						
			select coalesce ((select (round(AVG(ctm.obtained_mark / ct.total_mark),2) * (select ics.class_test_contribution   
					from institute_class_setting ics
					where ics.institute_session_oid = ct.institute_session_oid and ics.institute_class_oid = ct.institute_class_oid) )
					from class_test ct   
					left join class_test_mark ctm  on ct.oid = ctm.class_test_oid 
					where ct.term_oid = v_exam_result_mark.institute_class_term_oid and ctm.student_id = v_exam_result_mark.student_id
					group by ct.institute_session_oid , ct.institute_class_oid),0) into v_class_test_marks;
			--attendance marks
			select (select coalesce ( ceil((count( CASE when sad.status = 'Present' THEN 1 END) / case when  count(sad.status)>0 THEN count(sad.status)::float else 1 end )*(select ics.attendance_contribution 
				from institute_class_setting ics ,student s
				where ics.institute_oid = s.institute_oid 
				and ics.institute_session_oid = s.institute_session_oid 
				and ics.institute_class_oid = s.institute_class_oid
				and s.student_id= v_exam_result_mark.student_id)),0)
				from student s
				left join student_attendance_detail sad on sad.student_id =s.student_id 
				left join student_attendance sa on sa.oid = sad.student_attendance_oid
				left join institute_class_term ict on ict.oid = v_exam_result_mark.institute_class_term_oid
				where sa.institute_oid = s.institute_oid  
				and sa.institute_session_oid = s.institute_session_oid 
				and sa.institute_class_oid = s.institute_class_oid 
				and sa.institute_class_section_oid = s.institute_class_section_oid 
				and sa.institute_shift_oid = s.institute_shift_oid 
				and sa.institute_version_oid = s.institute_version_oid 
				and sad.student_id = v_exam_result_mark.student_id
				and sa.attendance_date between ict.start_date  and ict.end_date ) into v_attendance_marks;
			--obtained marks
			select (v_exam_result_mark.written_marks + v_exam_result_mark.mcq_marks+ v_exam_result_mark.lab_marks+ v_exam_result_mark.viva_marks ) into v_obtained_marks;
			--total obtained marks
			select coalesce (((v_obtained_marks*(select ics.final_exam_contribution  from institute_class_setting ics, student s 
							where s.student_id = v_exam_result_mark.student_id
							and s.institute_session_oid =ics.institute_session_oid 
							and s.institute_class_oid = ics.institute_class_oid))/100),0) into v_obtained_marks_contribution;
						
			select (coalesce(v_obtained_marks_contribution,0) + coalesce(v_assignment_marks,0) +  
					coalesce(v_class_test_marks,0) +  coalesce(v_attendance_marks,0)  +  coalesce(v_exam_result_mark.other_marks,0)  ) into v_total_obtained_marks;
			--grade point
			select (select igsd.grade_point  
				from institute_grading_system igs ,institute_grading_system_detail igsd , student s , institute_class ic , institute_class_level icl , institute_type it 
				where s.student_id =v_exam_result_mark.student_id
				and s.institute_oid =igs.institute_oid 
				and s.institute_class_oid = ic.oid 
				and ic.institute_class_level_oid = icl."oid" 
				and igs.education_system_oid = icl.education_system_oid 
				and it.institute_oid = s.institute_oid 
				and it.education_type_oid = icl.education_type_oid 
				and igs.institute_type_oid = it."oid" 
				and igsd.institute_grading_system_oid =igs."oid" 
				and v_total_obtained_marks> (igsd.start_marks -1) and v_total_obtained_marks <= igsd.end_marks) into v_grade_point;
			--letter grade
			select (select igsd.letter_grade  
				from institute_grading_system igs ,institute_grading_system_detail igsd , student s , institute_class ic , institute_class_level icl , institute_type it 
				where s.student_id =v_exam_result_mark.student_id
				and s.institute_oid =igs.institute_oid 
				and s.institute_class_oid = ic.oid 
				and ic.institute_class_level_oid = icl."oid" 
				and igs.education_system_oid = icl.education_system_oid 
				and it.institute_oid = s.institute_oid 
				and it.education_type_oid = icl.education_type_oid 
				and igs.institute_type_oid = it."oid" 
				and igsd.institute_grading_system_oid =igs."oid" 
				and v_total_obtained_marks> (igsd.start_marks -1) and v_total_obtained_marks <= igsd.end_marks) into v_letter_grade;
			--assessment
			select (select igsd.assessment  
				from institute_grading_system igs ,institute_grading_system_detail igsd , student s , institute_class ic , institute_class_level icl , institute_type it 
				where s.student_id =v_exam_result_mark.student_id
				and s.institute_oid =igs.institute_oid 
				and s.institute_class_oid = ic.oid 
				and ic.institute_class_level_oid = icl."oid" 
				and igs.education_system_oid = icl.education_system_oid 
				and it.institute_oid = s.institute_oid 
				and it.education_type_oid = icl.education_type_oid 
				and igs.institute_type_oid = it."oid" 
				and igsd.institute_grading_system_oid =igs."oid" 
				and v_total_obtained_marks> (igsd.start_marks -1) and v_total_obtained_marks <= igsd.end_marks) into v_assessment;
			
			--subject total mark
			select (select ics.total_marks  from institute_class_subject ics , exam e
						where e."oid" = p_exam_oid
						and ics.institute_oid = p_institute_oid
						and ics.education_subject_oid = p_education_subject_oid
						and ics.institute_class_oid  = p_institute_class_oid
						and ics.institute_session_oid  = e.institute_session_oid limit 1) into v_subject_total_marks;
--			RAISE NOTICE 'i want to print % ', v_subject_total_marks;
			--RAISE NOTICE 'i want to print % and % ass% ct% att%', v_exam_result_mark.oid,v_exam_result_mark.student_id,v_assignment_marks,v_class_test_marks,v_attendance_marks;
			 UPDATE exam_result_marks 
				SET assignment_marks  = v_assignment_marks,
					class_test_marks = v_class_test_marks,
					attendance_marks = v_attendance_marks,
					obtained_marks = v_obtained_marks,
					total_obtained_marks = v_total_obtained_marks,
					grade_point = v_grade_point,
					letter_grade = v_letter_grade,
					assessment = v_assessment,
					total_marks = v_subject_total_marks
				where oid = v_exam_result_mark.oid;							
										
										
										
										
	    	--RAISE NOTICE 'i want to print % and %', v_exam_result_mark.oid,v_exam_result_mark.student_id;
	    	-- for every student loop ends 
			
	    end loop;
      
	
	
    END;
$function$
;

