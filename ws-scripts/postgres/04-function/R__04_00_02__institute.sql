-- DROP FUNCTION IF EXISTS create_institute(varchar(128));
CREATE OR REPLACE FUNCTION create_institute(p_institute_oid varchar(128))
RETURNS void AS $create_institute$
    DECLARE
    	v_institute				record;	
    	v_session_education_type		record;
    	v_class_level				record;	
    	v_class					record;	
    	v_gading_system				record;	
    	v_gading_system_detail			record;	
    	v_education_group			record;	
    	v_session_class_group			record;	
    	v_subject				record;	
    	v_textbook				record;	
    	v_shift					record;
    	v_sms_service				record;
        v_timestamp                     	varchar(128);
        v_ledger_group_oid          		varchar(128);
        v_ledger_sub_group_oid          	varchar(128);
        v_ledger_oid                    	varchar(128);
        v_sub_ledger_oid                	varchar(128);
        v_ledger_setting_oid            	varchar(128);
        v_eiin_oid            			varchar(64);
        v_serial_no                             int4;
    BEGIN
    
        SELECT to_char(clock_timestamp(), 'YYYYMMDDHH24MISSMS') INTO v_timestamp;
        
        SELECT * INTO v_institute FROM institute WHERE oid = p_institute_oid;
        
        If (select count(oid) from institute WHERE eiin_number = v_institute.eiin_number) = 1 THEN
        	SELECT concat('SCHOOL-ERP-', v_institute.eiin_number, '-') INTO v_eiin_oid;
        ELSE
        	SELECT concat('SCHOOL-ERP-', v_institute.eiin_number, '-', random_number(), '-') INTO v_eiin_oid;
        END IF;
        
        SELECT concat(v_eiin_oid, 'LGR-Sub-Grp-', v_timestamp) INTO v_ledger_sub_group_oid;
        SELECT concat(v_eiin_oid, 'LGR-', v_timestamp) INTO v_ledger_oid;
        SELECT concat(v_eiin_oid, 'LGR-Setting-', v_timestamp) INTO v_ledger_setting_oid;
        SELECT concat(v_eiin_oid, 'Sub-LGR-', v_timestamp) INTO v_sub_ledger_oid;
        
       -- SELECT concat('SCHOOL-ERP-LSG-', v_timestamp) INTO v_ledger_sub_group_oid;
       -- SELECT concat('SCHOOL-ERP-LGR-', v_timestamp) INTO v_ledger_oid;
       -- SELECT concat('SCHOOL-ERP-LGRS-', v_timestamp) INTO v_ledger_setting_oid;
       -- SELECT concat('SCHOOL-ERP-SLGR-', v_timestamp) INTO v_sub_ledger_oid;
    	v_serial_no := 0;
        for v_session_education_type in (select ets.name_en, ets.name_bn, et.short_name, et.sort_order,  ets.status, ets.education_type_oid, ets.education_session_oid, 
        is2.oid as institute_session_oid from institute_session is2, education_type_session ets, education_type et, institute_type it where 1 = 1 
        and is2.education_session_oid = ets.education_session_oid and et.oid = ets.education_type_oid and it.education_type_oid = ets.education_type_oid 
        and it.institute_oid = is2.institute_oid and is2.institute_oid = p_institute_oid order by is2.oid, et.sort_order) loop 
        
            	v_serial_no := v_serial_no + 1;
        	INSERT INTO schoolerp.institute_session_education_type(oid, name_en, name_bn, short_name, sort_order, status, education_type_oid, 
        	institute_session_oid, institute_oid, created_by) VALUES(concat(v_eiin_oid, 'Ins-Ses-Edu-Type-', to_char(clock_timestamp(), 'YYYYMMDDHH24MISSMS'), v_serial_no), 
        	v_session_education_type.name_en, v_session_education_type.name_bn, v_session_education_type.short_name, v_session_education_type.sort_order, 
        	v_session_education_type.status, v_session_education_type.education_type_oid, v_session_education_type.institute_session_oid, p_institute_oid, v_institute.created_by);
	end loop;
    
        for v_class_level in (select ecl.oid, ecl.name_en, ecl.name_bn, ecl.no_of_class, ecl.sort_order, ecl.status, ecl.education_type_oid, ecl.education_system_oid 
        from institute_type it, education_type et, education_class_level ecl where 1 =1 and it.education_type_oid = et.oid and ecl.education_type_oid = et.oid 
        and it.institute_oid = p_institute_oid) loop 
        
        	INSERT INTO schoolerp.institute_class_level(oid, name_en, name_bn, no_of_class, sort_order, status, institute_oid, education_class_level_oid, 
        	education_type_oid, education_system_oid, created_by) VALUES(concat(v_eiin_oid, 'Edu-Level-', replace(v_class_level.name_en, ' ', '-')), v_class_level.name_en, v_class_level.name_bn, 
        	v_class_level.no_of_class, v_class_level.sort_order, v_class_level.status, p_institute_oid, v_class_level.oid, v_class_level.education_type_oid, 
        	v_class_level.education_system_oid, v_institute.created_by);
	end loop;
	
        for v_class in (select icl.oid as institute_class_level_oid, ec.oid, ec.name_en, ec.name_bn, ec.admission_age, ec.grade, ec.class_id, ec.sort_order, ec.status, ec.education_class_level_oid, 
        ec.education_type_oid, ec.education_system_oid from institute_class_level icl, education_class ec where 1 =1 
        and icl.education_class_level_oid = ec.education_class_level_oid and icl.institute_oid = p_institute_oid) loop 
        
        	INSERT INTO schoolerp.institute_class(oid, name_en, name_bn, institute_oid, institute_class_level_oid, education_class_oid, class_id, sort_order, status, created_by) 
        	VALUES(concat(v_eiin_oid, 'Class-', v_class.class_id), v_class.name_en, v_class.name_bn, p_institute_oid, v_class.institute_class_level_oid, 
        	v_class.oid, v_class.class_id, v_class.sort_order, v_class.status, v_institute.created_by);
	end loop;
	
        for v_gading_system in (select it.oid as institute_type_oid, egs.oid, egs.name_en, egs.name_bn, egs.grade_point_scale, egs.sort_order, egs.status, egs.education_type_oid, 
        egs.education_system_oid from institute_type it, education_grading_system egs where it.education_type_oid = egs.education_type_oid and it.institute_oid = p_institute_oid) loop 
        
        	INSERT INTO schoolerp.institute_grading_system (oid, name_en, name_bn, grade_point_scale, sort_order, status, institute_oid, institute_type_oid, education_system_oid, created_by) 
        	VALUES(concat(v_eiin_oid, uuid()), v_gading_system.name_en, v_gading_system.name_bn, v_gading_system.grade_point_scale, v_gading_system.sort_order, v_gading_system.status, p_institute_oid,
        	v_gading_system.institute_type_oid, v_gading_system.education_system_oid, v_institute.created_by);
	end loop;
	
        for v_gading_system_detail in (select igs.oid as institute_grading_system_oid, egsd.oid, egsd.start_marks, egsd.end_marks, egsd.letter_grade, egsd.grade_point, 
        egsd.assessment, egsd.remarks, egsd.sort_order, egsd.status, egsd.education_grading_system_oid from institute_type it, education_grading_system egs, 
        education_grading_system_detail egsd, schoolerp.institute_grading_system igs where 1 = 1 and it.education_type_oid = egs.education_type_oid 
        and egsd.education_grading_system_oid = egs.oid and igs.institute_type_oid = it.oid and it.institute_oid = p_institute_oid) loop 
        
        	INSERT INTO schoolerp.institute_grading_system_detail (oid, start_marks, end_marks, letter_grade, grade_point, assessment, remarks, sort_order, status, 
        	institute_grading_system_oid, institute_oid, created_by) 
        	VALUES(concat(v_eiin_oid, uuid()), v_gading_system_detail.start_marks, v_gading_system_detail.end_marks, v_gading_system_detail.letter_grade, 
        	v_gading_system_detail.grade_point, v_gading_system_detail.assessment, v_gading_system_detail.remarks, v_gading_system_detail.sort_order,
        	v_gading_system_detail.status, v_gading_system_detail.institute_grading_system_oid, p_institute_oid, v_institute.created_by);
	end loop;
	
        for v_education_group in (select * from education_group where education_system_oid = v_institute.education_system_oid) loop 
        
		INSERT INTO institute_class_group(oid, name_en, name_bn, status, institute_oid, education_group_oid, education_system_oid, education_curriculum_oid, created_by)
		VALUES(concat(v_eiin_oid, 'Institute-Group-', replace(v_education_group.name_en, ' ', '-')), v_education_group.name_en, v_education_group.name_bn, v_education_group.status, 
		p_institute_oid, v_education_group.oid, v_institute.education_system_oid, v_institute.education_curriculum_oid, v_institute.created_by);
				
	end loop;
	
	
	
	
        for v_session_class_group in (select is2.name_en, escg.education_group_oid, icg.oid as institute_class_group_oid, ic.oid as institute_class_oid, is2.oid as institute_session_oid 
        from institute_session is2, institute_session_education_type iset, institute_class_level icl, institute_class ic, education_session_class_group escg, institute_class_group icg 
        where 1 = 1 and is2.oid = iset.institute_session_oid and iset.institute_oid = is2.institute_oid and iset.education_type_oid = icl.education_type_oid 
        and icl.institute_oid = is2.institute_oid and ic.institute_class_level_oid = icl.oid and ic.institute_oid = is2.institute_oid 
        and escg.education_session_oid = is2.education_session_oid and escg.education_class_oid = ic.education_class_oid 
        and escg.education_group_oid = icg.education_group_oid and icg.institute_oid = is2.institute_oid and is2.institute_oid = p_institute_oid) loop 
		INSERT INTO institute_session_class_group(oid, education_group_oid, institute_class_group_oid, institute_class_oid, institute_session_oid, institute_oid, created_by)
		VALUES(concat(v_eiin_oid, 'Ins-Ses-Class-Group-', replace(v_session_class_group.name_en, ' ', '-'), '-', random_number()), v_session_class_group.education_group_oid, 
		v_session_class_group.institute_class_group_oid, v_session_class_group.institute_class_oid, v_session_class_group.institute_session_oid, p_institute_oid, v_institute.created_by);
				
	end loop;
	
	
	-- Insert Education Subject Information.
	
        for v_subject in (select distinct(ets.education_subject_oid), es.name_en, es.name_bn, es.subject_code, es.subject_type, es.status 
        from institute_type it, education_type_subject ets, education_subject es where 1 = 1 and ets.education_type_oid = it.education_type_oid 
        and es.oid = ets.education_subject_oid and it.institute_oid = p_institute_oid) loop 
        
		INSERT INTO institute_subject(oid, name_en, name_bn, subject_code, subject_type, status, education_subject_oid, institute_oid, created_by) 
		VALUES(concat(v_eiin_oid, uuid()), v_subject.name_en, v_subject.name_bn, v_subject.subject_code, v_subject.subject_type, v_subject.status, 
		v_subject.education_subject_oid, p_institute_oid, v_institute.created_by);
		
	end loop;
	
	-- Insert Institute Text Book Information.
        for v_textbook in (select s.oid as institute_session_oid, iv.oid as institute_version_oid, et.* from institute_session s, education_session es, education_textbook et, 
        education_version ev, institute_version iv, institute_class ic  where 1 = 1 and s.education_session_oid = es.oid and et.education_session_oid = es.oid 
        and et.education_version_oid = ev.oid and iv.education_version_oid = ev.oid and iv.institute_oid = s.institute_oid and ic.institute_oid = s.institute_oid 
        and et.education_class_oid = ic.education_class_oid and s.institute_oid = p_institute_oid order by et.education_version_oid) loop 
        
		
		INSERT INTO institute_class_textbook(oid, name_en, name_bn, subject_code, e_book_link, status, institute_oid, institute_session_oid, institute_version_oid, 
		institute_class_group_oid, institute_class_oid, education_textbook_oid, created_by) VALUES(concat(v_eiin_oid, uuid()), v_textbook.name_en, v_textbook.name_bn, 
		v_textbook.subject_code, v_textbook.e_book_link, v_textbook.status, p_institute_oid, v_textbook.institute_session_oid, v_textbook.institute_version_oid, 
		(select oid from institute_class_group where education_group_oid = v_textbook.education_group_oid and institute_oid = p_institute_oid), 
		(select oid from institute_class where education_class_oid = v_textbook.education_class_oid and institute_oid = p_institute_oid), 
		v_textbook.oid, v_institute.created_by);
		
	end loop;
	
	-- Insert Institute Class Period Information.
        for v_shift in (select * from institute_shift where institute_oid = p_institute_oid) loop 
        
		INSERT INTO class_period(oid, name_en, name_bn, institute_oid, institute_shift_oid, sort_order, status, created_by)
		VALUES(concat(v_eiin_oid, v_shift.name_en, '-Period-1'), 'Period 1', 'পিরিয়ড ১', p_institute_oid, v_shift.oid, 1, 'Active', v_institute.created_by);
		INSERT INTO class_period(oid, name_en, name_bn, institute_oid, institute_shift_oid, sort_order, status, created_by)
		VALUES(concat(v_eiin_oid, v_shift.name_en, '-Period-2'), 'Period 2', 'পিরিয়ড ২', p_institute_oid, v_shift.oid, 2, 'Active', v_institute.created_by);
		INSERT INTO class_period(oid, name_en, name_bn, institute_oid, institute_shift_oid, sort_order, status, created_by)
		VALUES(concat(v_eiin_oid, v_shift.name_en, '-Period-3'), 'Period 3', 'পিরিয়ড ৩', p_institute_oid, v_shift.oid, 3, 'Active', v_institute.created_by);
		INSERT INTO class_period(oid, name_en, name_bn, institute_oid, institute_shift_oid, sort_order, status, created_by)
		VALUES(concat(v_eiin_oid, v_shift.name_en, '-Period-4'), 'Period 4', 'পিরিয়ড ৪', p_institute_oid, v_shift.oid, 4, 'Active', v_institute.created_by);
		INSERT INTO class_period(oid, name_en, name_bn, institute_oid, institute_shift_oid, sort_order, status, created_by)
		VALUES(concat(v_eiin_oid, v_shift.name_en, '-Period-5'), 'Period 5', 'পিরিয়ড ৫', p_institute_oid, v_shift.oid, 5, 'Active', v_institute.created_by);
		INSERT INTO class_period(oid, name_en, name_bn, institute_oid, institute_shift_oid, sort_order, status, created_by)
		VALUES(concat(v_eiin_oid, v_shift.name_en, '-Period-6'), 'Period 6', 'পিরিয়ড ৬', p_institute_oid, v_shift.oid, 6, 'Active', v_institute.created_by);
		
	end loop;
	
	-- Insert Institute SMS Service Information.
        for v_sms_service in (select * from sms_feature) loop  
		INSERT INTO sms_service(oid, name_en, name_bn, sms_template_name, sms_template_text_en, sms_template_text_bn, sms_language, 
		email_subject, email_template_text_en, email_template_text_bn, email_language, applicable_for, remarks, status, 
		sms_feature_oid, institute_oid, created_by)
		VALUES(concat(v_eiin_oid, uuid()), v_sms_service.name_en, v_sms_service.name_bn, v_sms_service.sms_template_name, v_sms_service.sms_template_text_en, 
		v_sms_service.sms_template_text_bn, v_sms_service.sms_language, v_sms_service.email_subject, v_sms_service.email_template_text_en, 
		v_sms_service.email_template_text_bn, v_sms_service.email_language, v_sms_service.applicable_for, v_sms_service.remarks, 
		v_sms_service.status, v_sms_service.oid, p_institute_oid, v_institute.created_by);
		
	end loop;
	
	
	
	-- Insert Institute Week Day Information
	INSERT INTO week_day(oid, institute_oid, name_en, name_bn, sort_order, status, created_by) 
	VALUES(concat(v_eiin_oid, 'Week-Day-Saturday'), p_institute_oid, 'Saturday', 'শনিবার', 1, 'Active', v_institute.created_by);
	INSERT INTO week_day(oid, institute_oid, name_en, name_bn, sort_order, status, created_by) 
	VALUES(concat(v_eiin_oid, 'Week-Day-Sunday'), p_institute_oid, 'Sunday', 'রবিবার', 2, 'Active', v_institute.created_by);
	INSERT INTO week_day(oid, institute_oid, name_en, name_bn, sort_order, status, created_by) 
	VALUES(concat(v_eiin_oid, 'Week-Day-Monday'), p_institute_oid, 'Monday', 'সোমবার', 3, 'Active', v_institute.created_by);
	INSERT INTO week_day(oid, institute_oid, name_en, name_bn, sort_order, status, created_by) 
	VALUES(concat(v_eiin_oid, 'Week-Day-Tuesday'), p_institute_oid, 'Tuesday', 'মঙ্গলবার', 4, 'Active', v_institute.created_by);
	INSERT INTO week_day(oid, institute_oid, name_en, name_bn, sort_order, status, created_by) 
	VALUES(concat(v_eiin_oid, 'Week-Day-Wednesday'), p_institute_oid, 'Wednesday', 'বুধবার', 5, 'Active', v_institute.created_by);
	INSERT INTO week_day(oid, institute_oid, name_en, name_bn, sort_order, status, created_by) 
	VALUES(concat(v_eiin_oid, 'Week-Day-Thursday'), p_institute_oid, 'Thursday', 'বৃহস্পতিবার', 6, 'Active', v_institute.created_by);
	INSERT INTO week_day(oid, institute_oid, name_en, name_bn, sort_order, status, created_by) 
	VALUES(concat(v_eiin_oid, 'Week-Day-Friday'), p_institute_oid, 'Friday', 'শুক্রবার', 7, 'Inactive', v_institute.created_by);
		
	-- Insert Institute Fees Head Group Information
	INSERT INTO fee_head_group(oid, group_code, name_en, name_bn, group_type, remarks, status, institute_oid, created_by) 
	VALUES(concat(v_eiin_oid, 'Fee-Head-Group-Oid-Admission-101'), '101', 'Admission', 'ভর্তি', NULL, NULL, 'Active', p_institute_oid, v_institute.created_by);
	INSERT INTO fee_head_group(oid, group_code, name_en, name_bn, group_type, remarks, status, institute_oid, created_by) 
	VALUES(concat(v_eiin_oid, 'Fee-Head-Group-Oid-Tution-102'), '102', 'Tuition', 'টিউশন', NULL, NULL, 'Active', p_institute_oid, v_institute.created_by);
	INSERT INTO fee_head_group(oid, group_code, name_en, name_bn, group_type, remarks, status, institute_oid, created_by) 
	VALUES(concat(v_eiin_oid, 'Fee-Head-Group-Oid-Exam-103'), '103', 'Exam', 'পরীক্ষা', NULL, NULL, 'Active', p_institute_oid, v_institute.created_by);
	
	-- Insert Institute Fees Head Information
	INSERT INTO fee_head(oid, institute_oid, head_code, name_en, name_bn, head_type, remarks, status, created_by) 
	VALUES(concat(v_eiin_oid, uuid()), p_institute_oid, 'ADMISSION_FEE', 'Admission Fee', 'ভর্তি ফী', 'One-Time', NULL, 'Active', v_institute.created_by);
	INSERT INTO fee_head(oid, institute_oid, head_code, name_en, name_bn, head_type, remarks, status, created_by) 
	VALUES(concat(v_eiin_oid, uuid()), p_institute_oid, 'TUITION_FEE', 'Tuition Fee', 'টিউশন ফী', 'Monthly', NULL, 'Active', v_institute.created_by);
	INSERT INTO fee_head(oid, institute_oid, head_code, name_en, name_bn, head_type, remarks, status, created_by) 
	VALUES(concat(v_eiin_oid, uuid()), p_institute_oid, 'EXAM_FEE', 'Exam Fee', 'পরীক্ষার ফী', 'One-Time', NULL, 'Active', v_institute.created_by);
	INSERT INTO fee_head(oid, institute_oid, head_code, name_en, name_bn, head_type, remarks, status, created_by) 
	VALUES(concat(v_eiin_oid, uuid()), p_institute_oid, 'CAUTION_MONEY', 'Caution money', 'সতর্কতা টাকা', 'One-Time', NULL, 'Active', v_institute.created_by);
	INSERT INTO fee_head(oid, institute_oid, head_code, name_en, name_bn, head_type, remarks, status, created_by) 
	VALUES(concat(v_eiin_oid, uuid()), p_institute_oid, 'ANNUAL_CHARGE', 'Annual Charge', 'বাৎসরিক চার্জ', 'One-Time', NULL, 'Active', v_institute.created_by);
	INSERT INTO fee_head(oid, institute_oid, head_code, name_en, name_bn, head_type, remarks, status, created_by) 
	VALUES(concat(v_eiin_oid, uuid()), p_institute_oid, 'DEVELOPMENT_CHARGE', 'Development Charge', 'উন্নয়ন চার্জ', 'One-Time', NULL, 'Active', v_institute.created_by);
	INSERT INTO fee_head(oid, institute_oid, head_code, name_en, name_bn, head_type, remarks, status, created_by) 
	VALUES(concat(v_eiin_oid, uuid()), p_institute_oid, 'PROCESSING_FEE', 'Processing Fee', 'প্রক্রিয়াকরণ ফি', 'One-Time', NULL, 'Active', v_institute.created_by);
	INSERT INTO fee_head(oid, institute_oid, head_code, name_en, name_bn, head_type, remarks, status, created_by) 
	VALUES(concat(v_eiin_oid, uuid()), p_institute_oid, 'LATE_FEE', 'Late Fee', 'লেট ফি', 'One-Time', NULL, 'Active', v_institute.created_by);
	INSERT INTO fee_head(oid, institute_oid, head_code, name_en, name_bn, head_type, remarks, status, created_by) 
	VALUES(concat(v_eiin_oid, uuid()), p_institute_oid, 'ELECTRICITY_BILL', 'Electricity Bill', 'বিদ্যুৎ বিল', 'One-Time', NULL, 'Active', v_institute.created_by);
	INSERT INTO fee_head(oid, institute_oid, head_code, name_en, name_bn, head_type, remarks, status, created_by) 
	VALUES(concat(v_eiin_oid, uuid()), p_institute_oid, 'UTILITY_CHARGE', 'Utility Charge', 'ইউটিলিটি চার্জ', 'One-Time', NULL, 'Active', v_institute.created_by);
	INSERT INTO fee_head(oid, institute_oid, head_code, name_en, name_bn, head_type, remarks, status, created_by) 
	VALUES(concat(v_eiin_oid, uuid()), p_institute_oid, 'OTHERS', 'Others', 'অন্যান্য', 'One-Time', NULL, 'Active', v_institute.created_by);
	
	
	INSERT INTO financial_period(oid, name_en, name_bn, period_type, period_start_date, period_end_date, version_id, status, institute_oid, created_by) 
	VALUES(concat(v_eiin_oid, 'FP-', to_char(clock_timestamp(), 'YYYY')), (select date_part('year', CURRENT_DATE)), (select date_part('year', CURRENT_DATE)), 'Yearly', 
	(select date_trunc('year', now())), (SELECT date_trunc('year', now()+ interval '1 year') - interval '1 day'), '1', 'Opened', p_institute_oid, v_institute.created_by);
			
		--SCHOOL-ERP-Ledger-Group-01-Asset
		--SCHOOL-ERP-Ledger-Group-02-Liabilities
		--SCHOOL-ERP-Ledger-Group-03-Equity
		--SCHOOL-ERP-Ledger-Group-04-Revenue
		--SCHOOL-ERP-Ledger-Group-05-Expense
	
	-- Insert Institute Accounting Information
	-- v_ledger_group_oid := 'SCHOOL-ERP-Ledger-Group-01-Asset';
        SELECT oid INTO v_ledger_group_oid FROM ledger_group WHERE ledger_group_code = '01';
        
	INSERT INTO ledger_sub_group(oid, name_en, name_bn, ledger_sub_group_code, ledger_sub_group_type, is_balance_sheet_item, 
	ledger_group_code, version_id, status, ledger_group_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_sub_group_oid, '01-0101'), 'Current Assets', 'চলতি সম্পদ', '0101', 'Debit', 'Yes', '01', '1', 'Active', 
	v_ledger_group_oid, p_institute_oid, v_institute.created_by);
	
	INSERT INTO ledger(oid, name_en, name_bn, ledger_code, mnemonic, ledger_type, is_balance_sheet_item, 
	ledger_sub_group_code, version_id, status, ledger_sub_group_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_oid, '-01-0101-001'), 'Cash', 'নগদ', '0101001', 'Cash', 'Debit', 'Yes', '0101', '1', 'Active', 
	concat(v_ledger_sub_group_oid, '01-0101'), p_institute_oid, v_institute.created_by);
	
	INSERT INTO ledger(oid, name_en, name_bn, ledger_code, mnemonic, ledger_type, is_balance_sheet_item, 
	ledger_sub_group_code, version_id, status, ledger_sub_group_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_oid, '-01-0101-002'), 'Accounts Receivables', 'প্রাপ্য হিসাব', '0101002', 'Accounts Receivables', 'Debit', 'Yes', '0101', '1', 'Active', 
	concat(v_ledger_sub_group_oid, '01-0101'), p_institute_oid, v_institute.created_by);
	
	INSERT INTO ledger(oid, name_en, name_bn, ledger_code, mnemonic, ledger_type, is_balance_sheet_item, 
	ledger_sub_group_code, version_id, status, ledger_sub_group_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_oid, '-01-0101-003'), 'Academic Fee', 'একাডেমিক ফি', '0101003', 'Academic Fee', 'Debit', 'Yes', '0101', '1', 'Active', 
	concat(v_ledger_sub_group_oid, '01-0101'), p_institute_oid, v_institute.created_by);
	
	INSERT INTO ledger(oid, name_en, name_bn, ledger_code, mnemonic, ledger_type, is_balance_sheet_item, 
	ledger_sub_group_code, version_id, status, ledger_sub_group_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_oid, '-01-0101-004'), 'Academic Fine', 'একাডেমিক ফাইন', '0101004', 'Academic Fine', 'Debit', 'Yes', '0101', '1', 'Active', 
	concat(v_ledger_sub_group_oid, '01-0101'), p_institute_oid, v_institute.created_by);
	
	INSERT INTO ledger(oid, name_en, name_bn, ledger_code, mnemonic, ledger_type, is_balance_sheet_item, 
	ledger_sub_group_code, version_id, status, ledger_sub_group_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_oid, '-01-0101-005'), 'Cash in Bank', 'ব্যাংকে নগদ', '0101005', 'Cash in Bank', 'Debit', 'Yes', '0101', '1', 'Active', 
	concat(v_ledger_sub_group_oid, '01-0101'), p_institute_oid, v_institute.created_by);
	
	INSERT INTO ledger(oid, name_en, name_bn, ledger_code, mnemonic, ledger_type, is_balance_sheet_item, 
	ledger_sub_group_code, version_id, status, ledger_sub_group_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_oid, '-01-0101-006'), 'Advance Payment', 'অগ্রিম পেমেন্ট', '0101006', 'Advance Payment', 'Debit', 'Yes', '0101', '1', 'Active', 
	concat(v_ledger_sub_group_oid, '01-0101'), p_institute_oid, v_institute.created_by);
	
	
	
	INSERT INTO ledger_sub_group(oid, name_en, name_bn, ledger_sub_group_code, ledger_sub_group_type, is_balance_sheet_item, 
	ledger_group_code, version_id, status, ledger_group_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_sub_group_oid, '01-0102'), 'Fixed Assets', 'স্থায়ী সম্পদ', '0102', 'Debit', 'Yes', '01', '1', 'Active', 
	v_ledger_group_oid, p_institute_oid, v_institute.created_by);
	
	INSERT INTO ledger(oid, name_en, name_bn, ledger_code, mnemonic, ledger_type, is_balance_sheet_item, 
	ledger_sub_group_code, version_id, status, ledger_sub_group_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_oid, '-01-0102-001'), 'Office Furniture', 'অফিস আসবাবপত্র', '0102001', 'Office Furniture', 'Debit', 'Yes', '0102', '1', 'Active', 
	concat(v_ledger_sub_group_oid, '01-0102'), p_institute_oid, v_institute.created_by);
	
	INSERT INTO ledger(oid, name_en, name_bn, ledger_code, mnemonic, ledger_type, is_balance_sheet_item, 
	ledger_sub_group_code, version_id, status, ledger_sub_group_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_oid, '-01-0102-002'), 'Office Equipment', 'অফিস সরঞ্জাম', '0102002', 'Office Equipment', 'Debit', 'Yes', '0102', '1', 'Active', 
	concat(v_ledger_sub_group_oid, '01-0102'), p_institute_oid, v_institute.created_by);
	
	INSERT INTO ledger(oid, name_en, name_bn, ledger_code, mnemonic, ledger_type, is_balance_sheet_item, 
	ledger_sub_group_code, version_id, status, ledger_sub_group_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_oid, '-01-0102-003'), 'Office Stationery', 'অফিস স্টেশনারি', '0102003', 'Office Stationery', 'Debit', 'Yes', '0102', '1', 'Active', 
	concat(v_ledger_sub_group_oid, '01-0102'), p_institute_oid, v_institute.created_by);
	
	INSERT INTO ledger(oid, name_en, name_bn, ledger_code, mnemonic, ledger_type, is_balance_sheet_item, 
	ledger_sub_group_code, version_id, status, ledger_sub_group_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_oid, '-01-0102-004'), 'Inventory', 'ইনভেন্টরি', '0102004', 'Inventory', 'Debit', 'Yes', '0102', '1', 'Active', 
	concat(v_ledger_sub_group_oid, '01-0102'), p_institute_oid, v_institute.created_by);
	
	
	-- v_ledger_group_oid := 'SCHOOL-ERP-Ledger-Group-02-Liabilities';
        SELECT oid INTO v_ledger_group_oid FROM ledger_group WHERE ledger_group_code = '02';
        
	INSERT INTO ledger_sub_group(oid, name_en, name_bn, ledger_sub_group_code, ledger_sub_group_type, is_balance_sheet_item, 
	ledger_group_code, version_id, status, ledger_group_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_sub_group_oid, '02-0201'), 'Current Liabilities', 'বর্তমান দায়', '0201', 'Credit', 'Yes', '02', '1', 'Active', 
	v_ledger_group_oid, p_institute_oid, v_institute.created_by);
	
	INSERT INTO ledger(oid, name_en, name_bn, ledger_code, mnemonic, ledger_type, is_balance_sheet_item, 
	ledger_sub_group_code, version_id, status, ledger_sub_group_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_oid, '-02-0201-001'), 'Advance Received', 'অগ্রিম প্রাপ্ত', '0201001', 'Advance Received', 'Credit', 'Yes', '0201', '1', 'Active', 
	concat(v_ledger_sub_group_oid, '02-0201'), p_institute_oid, v_institute.created_by);
	
	INSERT INTO ledger(oid, name_en, name_bn, ledger_code, mnemonic, ledger_type, is_balance_sheet_item, 
	ledger_sub_group_code, version_id, status, ledger_sub_group_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_oid, '-02-0201-002'), 'Short Term Loan', 'স্বল্পমেয়াদী ঋণ', '0201002', 'Short Term Loan', 'Credit', 'Yes', '0201', '1', 'Active', 
	concat(v_ledger_sub_group_oid, '02-0201'), p_institute_oid, v_institute.created_by);
	
	INSERT INTO ledger(oid, name_en, name_bn, ledger_code, mnemonic, ledger_type, is_balance_sheet_item, 
	ledger_sub_group_code, version_id, status, ledger_sub_group_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_oid, '-02-0201-003'), 'Accounts Payable', 'প্রদেয় হিসাব', '0201003', 'Accounts Payable', 'Credit', 'Yes', '0201', '1', 'Active', 
	concat(v_ledger_sub_group_oid, '02-0201'), p_institute_oid, v_institute.created_by);
	
	INSERT INTO ledger(oid, name_en, name_bn, ledger_code, mnemonic, ledger_type, is_balance_sheet_item, 
	ledger_sub_group_code, version_id, status, ledger_sub_group_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_oid, '-02-0201-004'), 'Tax Payable', 'কর পরিশোধ যোগ্য হিসাব', '0201004', 'Tax Payable', 'Credit', 'Yes', '0201', '1', 'Active', 
	concat(v_ledger_sub_group_oid, '02-0201'), p_institute_oid, v_institute.created_by);
	
	INSERT INTO ledger(oid, name_en, name_bn, ledger_code, mnemonic, ledger_type, is_balance_sheet_item, 
	ledger_sub_group_code, version_id, status, ledger_sub_group_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_oid, '-02-0201-005'), 'Salary Payable', 'প্রদেয় বেতন হিসাব', '0201005', 'Salary Payable', 'Credit', 'Yes', '0201', '1', 'Active', 
	concat(v_ledger_sub_group_oid, '02-0201'), p_institute_oid, v_institute.created_by);	
	
	
	-- v_ledger_group_oid := 'SCHOOL-ERP-Ledger-Group-03-Equity';
        SELECT oid INTO v_ledger_group_oid FROM ledger_group WHERE ledger_group_code = '03';
        
	INSERT INTO ledger_sub_group(oid, name_en, name_bn, ledger_sub_group_code, ledger_sub_group_type, is_balance_sheet_item, 
	ledger_group_code, version_id, status, ledger_group_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_sub_group_oid, '03-0301'), 'BOD Investments', 'বিওডি বিনিয়োগ', '0301', 'Credit', 'Yes', '03', '1', 'Active', 
	v_ledger_group_oid, p_institute_oid, v_institute.created_by);
	
	INSERT INTO ledger(oid, name_en, name_bn, ledger_code, mnemonic, ledger_type, is_balance_sheet_item, 
	ledger_sub_group_code, version_id, status, ledger_sub_group_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_oid, '-03-0301-001'), 'BOD Investments', 'বিওডি বিনিয়োগ', '0301001', 'Salary Payable', 'Credit', 'Yes', '0301', '1', 'Active', 
	concat(v_ledger_sub_group_oid, '03-0301'), p_institute_oid, v_institute.created_by);
	
	INSERT INTO ledger(oid, name_en, name_bn, ledger_code, mnemonic, ledger_type, is_balance_sheet_item, 
	ledger_sub_group_code, version_id, status, ledger_sub_group_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_oid, '-03-0301-002'), 'Retained Earning', 'রক্ষিত উপার্জন', '0301002', 'Retained Earning', 'Credit', 'Yes', '0301', '1', 'Active', 
	concat(v_ledger_sub_group_oid, '03-0301'), p_institute_oid, v_institute.created_by);
	
	INSERT INTO ledger(oid, name_en, name_bn, ledger_code, mnemonic, ledger_type, is_balance_sheet_item, 
	ledger_sub_group_code, version_id, status, ledger_sub_group_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_oid, '-03-0301-003'), 'Discount Earned', 'অর্জিত ডিসকাউন্ট', '0301003', 'Discount Earned', 'Credit', 'Yes', '0301', '1', 'Active', 
	concat(v_ledger_sub_group_oid, '03-0301'), p_institute_oid, v_institute.created_by);
		
	
	-- v_ledger_group_oid := 'SCHOOL-ERP-Ledger-Group-04-Revenue';
        SELECT oid INTO v_ledger_group_oid FROM ledger_group WHERE ledger_group_code = '04';
        
	INSERT INTO ledger_sub_group(oid, name_en, name_bn, ledger_sub_group_code, ledger_sub_group_type, is_balance_sheet_item, 
	ledger_group_code, version_id, status, ledger_group_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_sub_group_oid, '04-0401'), 'Revenue from Service', 'পরিষেবা থেকে আয়', '0401', 'Credit', 'No', '04', '1', 'Active', 
	v_ledger_group_oid, p_institute_oid, v_institute.created_by);
	
	INSERT INTO ledger(oid, name_en, name_bn, ledger_code, mnemonic, ledger_type, is_balance_sheet_item, 
	ledger_sub_group_code, version_id, status, ledger_sub_group_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_oid, '-04-0401-001'), 'Academic Fee Collection', 'একাডেমিক ফি  আদায়', '0401001', 'Academic Fee Collection', 'Credit', 'No', '0401', '1', 'Active', 
	concat(v_ledger_sub_group_oid, '04-0401'), p_institute_oid, v_institute.created_by);
	
	INSERT INTO ledger(oid, name_en, name_bn, ledger_code, mnemonic, ledger_type, is_balance_sheet_item, 
	ledger_sub_group_code, version_id, status, ledger_sub_group_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_oid, '-04-0401-002'), 'Academic Fine Collection', 'একাডেমিক ফাইন  আদায়', '0401002', 'Academic Fine Collection', 'Credit', 'No', '0401', '1', 'Active', 
	concat(v_ledger_sub_group_oid, '04-0401'), p_institute_oid, v_institute.created_by);
	
        
	INSERT INTO ledger_sub_group(oid, name_en, name_bn, ledger_sub_group_code, ledger_sub_group_type, is_balance_sheet_item, 
	ledger_group_code, version_id, status, ledger_group_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_sub_group_oid, '04-0402'), 'Revenue from Investment', 'বিনিয়োগ থেকে আয়', '0402', 'Credit', 'No', '04', '1', 'Active', 
	v_ledger_group_oid, p_institute_oid, v_institute.created_by);
	
	INSERT INTO ledger(oid, name_en, name_bn, ledger_code, mnemonic, ledger_type, is_balance_sheet_item, 
	ledger_sub_group_code, version_id, status, ledger_sub_group_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_oid, '-04-0402-001'), 'Investment Revenue', 'বিনিয়োগ রাজস্ব', '0402001', 'Investment Revenue', 'Credit', 'No', '0402', '1', 'Active', 
	concat(v_ledger_sub_group_oid, '04-0402'), p_institute_oid, v_institute.created_by);	
	
        
	INSERT INTO ledger_sub_group(oid, name_en, name_bn, ledger_sub_group_code, ledger_sub_group_type, is_balance_sheet_item, 
	ledger_group_code, version_id, status, ledger_group_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_sub_group_oid, '04-0403'), 'Revenue from Asset', 'সম্পদ থেকে রাজস্ব', '0403', 'Credit', 'No', '04', '1', 'Active', 
	v_ledger_group_oid, p_institute_oid, v_institute.created_by);
	
	INSERT INTO ledger(oid, name_en, name_bn, ledger_code, mnemonic, ledger_type, is_balance_sheet_item, 
	ledger_sub_group_code, version_id, status, ledger_sub_group_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_oid, '-04-0403-001'), 'Asset Revenue', 'সম্পদ রাজস্ব', '0403001', 'Asset Revenue', 'Credit', 'No', '0403', '1', 'Active', 
	concat(v_ledger_sub_group_oid, '04-0403'), p_institute_oid, v_institute.created_by);
		
        
	INSERT INTO ledger_sub_group(oid, name_en, name_bn, ledger_sub_group_code, ledger_sub_group_type, is_balance_sheet_item, 
	ledger_group_code, version_id, status, ledger_group_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_sub_group_oid, '04-0404'), 'Revenue from Business', 'ব্যবসা থেকে রাজস্ব', '0404', 'Credit', 'No', '04', '1', 'Active', 
	v_ledger_group_oid, p_institute_oid, v_institute.created_by);
	
	INSERT INTO ledger(oid, name_en, name_bn, ledger_code, mnemonic, ledger_type, is_balance_sheet_item, 
	ledger_sub_group_code, version_id, status, ledger_sub_group_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_oid, '-04-0404-001'), 'Business Revenue', 'ব্যবসার রাজস্ব', '0404001', 'Business Revenue', 'Credit', 'No', '0404', '1', 'Active', 
	concat(v_ledger_sub_group_oid, '04-0404'), p_institute_oid, v_institute.created_by);	
	
        
	INSERT INTO ledger_sub_group(oid, name_en, name_bn, ledger_sub_group_code, ledger_sub_group_type, is_balance_sheet_item, 
	ledger_group_code, version_id, status, ledger_group_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_sub_group_oid, '04-0405'), 'Revenue from Govt Fund', 'সরকারী তহবিল থেকে রাজস্ব', '0405', 'Credit', 'No', '04', '1', 'Active', 
	v_ledger_group_oid, p_institute_oid, v_institute.created_by);
	
	INSERT INTO ledger(oid, name_en, name_bn, ledger_code, mnemonic, ledger_type, is_balance_sheet_item, 
	ledger_sub_group_code, version_id, status, ledger_sub_group_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_oid, '-04-0405-001'), 'Government funding for salaries', 'বেতন বাবদ সরকারি তহবিল', '0405001', 'Government funding for salaries', 'Credit', 'No', '0405', '1', 'Active', 
	concat(v_ledger_sub_group_oid, '04-0405'), p_institute_oid, v_institute.created_by);
		
        
	INSERT INTO ledger_sub_group(oid, name_en, name_bn, ledger_sub_group_code, ledger_sub_group_type, is_balance_sheet_item, 
	ledger_group_code, version_id, status, ledger_group_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_sub_group_oid, '04-0406'), 'Revenue from Donation', 'অনুদান থেকে রাজস্ব', '0406', 'Credit', 'No', '04', '1', 'Active', 
	v_ledger_group_oid, p_institute_oid, v_institute.created_by);
	
	INSERT INTO ledger(oid, name_en, name_bn, ledger_code, mnemonic, ledger_type, is_balance_sheet_item, 
	ledger_sub_group_code, version_id, status, ledger_sub_group_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_oid, '-04-0406-001'), 'Donation Collection', 'অনুদান আদায়', '0406001', 'Donation Collection', 'Credit', 'No', '0406', '1', 'Active', 
	concat(v_ledger_sub_group_oid, '04-0406'), p_institute_oid, v_institute.created_by);
	
	    
	INSERT INTO ledger_sub_group(oid, name_en, name_bn, ledger_sub_group_code, ledger_sub_group_type, is_balance_sheet_item, 
	ledger_group_code, version_id, status, ledger_group_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_sub_group_oid, '04-0407'), 'Adjusting Entries - Receivables Adjustment', 'অ্যাডজাস্টিং এন্ট্রি - প্রাপ্য সামঞ্জস্য', '0407', 'Credit', 'No', '04', '1', 'Active', 
	v_ledger_group_oid, p_institute_oid, v_institute.created_by);
	
	INSERT INTO ledger(oid, name_en, name_bn, ledger_code, mnemonic, ledger_type, is_balance_sheet_item, 
	ledger_sub_group_code, version_id, status, ledger_sub_group_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_oid, '-04-0407-001'), 'Adjustment of Accounts Receivable', 'প্রাপ্য হিসাব সমন্বয়', '0407001', 'Adjustment of Accounts Receivable', 'Credit', 'No', '0407', '1', 'Active', 
	concat(v_ledger_sub_group_oid, '04-0407'), p_institute_oid, v_institute.created_by);
	
	INSERT INTO ledger(oid, name_en, name_bn, ledger_code, mnemonic, ledger_type, is_balance_sheet_item, 
	ledger_sub_group_code, version_id, status, ledger_sub_group_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_oid, '-04-0407-002'), 'Adjustment of Advance Payment', 'অগ্রিম পেমেন্ট সমন্বয়', '0407002', 'Adjustment of Advance Payment', 'Credit', 'No', '0407', '1', 'Active', 
	concat(v_ledger_sub_group_oid, '04-0407'), p_institute_oid, v_institute.created_by);
	
	
	-- v_ledger_group_oid := 'SCHOOL-ERP-Ledger-Group-05-Expense';
        SELECT oid INTO v_ledger_group_oid FROM ledger_group WHERE ledger_group_code = '05';
        
	INSERT INTO ledger_sub_group(oid, name_en, name_bn, ledger_sub_group_code, ledger_sub_group_type, is_balance_sheet_item, 
	ledger_group_code, version_id, status, ledger_group_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_sub_group_oid, '05-0501'), 'Expenses for Services', 'পরিষেবার খরচ', '0501', 'Debit', 'No', '05', '1', 'Active', 
	v_ledger_group_oid, p_institute_oid, v_institute.created_by);
	
	
	INSERT INTO ledger(oid, name_en, name_bn, ledger_code, mnemonic, ledger_type, is_balance_sheet_item, 
	ledger_sub_group_code, version_id, status, ledger_sub_group_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_oid, '-05-0501-001'), 'Direct Costs of Service Delivery', 'সেবা প্রদানের সরাসরি খরচ', '0501001', 'Direct Costs of Service Delivery', 'Debit', 'No', '0501', '1', 'Active', 
	concat(v_ledger_sub_group_oid, '05-0501'), p_institute_oid, v_institute.created_by);
	INSERT INTO ledger(oid, name_en, name_bn, ledger_code, mnemonic, ledger_type, is_balance_sheet_item, 
	ledger_sub_group_code, version_id, status, ledger_sub_group_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_oid, '-05-0501-002'), 'Overhead Expense', 'ওভারহেড খরচ', '0501002', 'Overhead Expense', 'Debit', 'No', '0501', '1', 'Active', 
	concat(v_ledger_sub_group_oid, '05-0501'), p_institute_oid, v_institute.created_by);
	INSERT INTO ledger(oid, name_en, name_bn, ledger_code, mnemonic, ledger_type, is_balance_sheet_item, 
	ledger_sub_group_code, version_id, status, ledger_sub_group_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_oid, '-05-0501-003'), 'Tax Expense', 'ট্যাক্স খরচ', '0501003', 'Tax Expense', 'Debit', 'No', '0501', '1', 'Active', 
	concat(v_ledger_sub_group_oid, '05-0501'), p_institute_oid, v_institute.created_by);
	
	        
	INSERT INTO ledger_sub_group(oid, name_en, name_bn, ledger_sub_group_code, ledger_sub_group_type, is_balance_sheet_item, 
	ledger_group_code, version_id, status, ledger_group_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_sub_group_oid, '05-0502'), 'Operating Expenses - Operations', 'অপারেটিং খরচ - অপারেশন', '0502', 'Debit', 'No', '05', '1', 'Active', 
	v_ledger_group_oid, p_institute_oid, v_institute.created_by);
	
	
	INSERT INTO ledger(oid, name_en, name_bn, ledger_code, mnemonic, ledger_type, is_balance_sheet_item, 
	ledger_sub_group_code, version_id, status, ledger_sub_group_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_oid, '-05-0502-001'), 'Production Side Rental', 'উৎপাদন পার্শ্ব ভাড়া', '0502001', 'Production Side Rental', 'Debit', 'No', '0502', '1', 'Active', 
	concat(v_ledger_sub_group_oid, '05-0502'), p_institute_oid, v_institute.created_by);	
	INSERT INTO ledger(oid, name_en, name_bn, ledger_code, mnemonic, ledger_type, is_balance_sheet_item, 
	ledger_sub_group_code, version_id, status, ledger_sub_group_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_oid, '-05-0502-002'), 'Production Side Maintenance', 'উত্পাদন পার্শ্ব রক্ষণাবেক্ষণ', '0502002', 'Production Side Maintenance', 'Debit', 'No', '0502', '1', 'Active', 
	concat(v_ledger_sub_group_oid, '05-0502'), p_institute_oid, v_institute.created_by);
	INSERT INTO ledger(oid, name_en, name_bn, ledger_code, mnemonic, ledger_type, is_balance_sheet_item, 
	ledger_sub_group_code, version_id, status, ledger_sub_group_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_oid, '-05-0502-003'), 'Production Executives Salaries', 'প্রোডাকশন এক্সিকিউটিভদের বেতন', '0502003', 'Production Executives Salaries', 'Debit', 'No', '0502', '1', 'Active', 
	concat(v_ledger_sub_group_oid, '05-0502'), p_institute_oid, v_institute.created_by);
	INSERT INTO ledger(oid, name_en, name_bn, ledger_code, mnemonic, ledger_type, is_balance_sheet_item, 
	ledger_sub_group_code, version_id, status, ledger_sub_group_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_oid, '-05-0502-004'), 'Production Executives Commissions/Incentives', 'প্রোডাকশন এক্সিকিউটিভ কমিশন/ইনসেন্টিভ', '0502004', 'Production Executives Commissions/Incentives', 
	'Debit', 'No', '0502', '1', 'Active', 
	concat(v_ledger_sub_group_oid, '05-0502'), p_institute_oid, v_institute.created_by);
	INSERT INTO ledger(oid, name_en, name_bn, ledger_code, mnemonic, ledger_type, is_balance_sheet_item, 
	ledger_sub_group_code, version_id, status, ledger_sub_group_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_oid, '-05-0502-005'), 'Production Executives Festival Bonus', 'প্রোডাকশন এক্সিকিউটিভ ফেস্টিভ্যাল বোনাস', '0502005', 'Production Executives Festival Bonus', 
	'Debit', 'No', '0502', '1', 'Active', 
	concat(v_ledger_sub_group_oid, '05-0502'), p_institute_oid, v_institute.created_by);
	INSERT INTO ledger(oid, name_en, name_bn, ledger_code, mnemonic, ledger_type, is_balance_sheet_item, 
	ledger_sub_group_code, version_id, status, ledger_sub_group_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_oid, '-05-0502-006'), 'Consultancy Expense', 'কনসালটেন্সি খরচ', '0502006', 'Consultancy Expense', 'Debit', 'No', '0502', '1', 'Active', 
	concat(v_ledger_sub_group_oid, '05-0502'), p_institute_oid, v_institute.created_by);
	
	
        
	INSERT INTO ledger_sub_group(oid, name_en, name_bn, ledger_sub_group_code, ledger_sub_group_type, is_balance_sheet_item, 
	ledger_group_code, version_id, status, ledger_group_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_sub_group_oid, '05-0503'), 'Operating Expenses - General & Administrative', 'পরিচালন ব্যয় - সাধারণ ও প্রশাসনিক', '0503', 'Debit', 'No', '05', '1', 'Active', 
	v_ledger_group_oid, p_institute_oid, v_institute.created_by);
	
	
	INSERT INTO ledger(oid, name_en, name_bn, ledger_code, mnemonic, ledger_type, is_balance_sheet_item, 
	ledger_sub_group_code, version_id, status, ledger_sub_group_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_oid, '-05-0503-001'), 'Office Rental', 'অফিস ভাড়া', '0503001', 'Office Rental', 'Debit', 'No', '0503', '1', 'Active', 
	concat(v_ledger_sub_group_oid, '05-0503'), p_institute_oid, v_institute.created_by);
	INSERT INTO ledger(oid, name_en, name_bn, ledger_code, mnemonic, ledger_type, is_balance_sheet_item, 
	ledger_sub_group_code, version_id, status, ledger_sub_group_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_oid, '-05-0503-002'), 'Office Maintenance', 'অফিস ব্যবস্থাপনা', '0503002', 'Office Maintenance', 'Debit', 'No', '0503', '1', 'Active', 
	concat(v_ledger_sub_group_oid, '05-0503'), p_institute_oid, v_institute.created_by);
	INSERT INTO ledger(oid, name_en, name_bn, ledger_code, mnemonic, ledger_type, is_balance_sheet_item, 
	ledger_sub_group_code, version_id, status, ledger_sub_group_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_oid, '-05-0503-003'), 'Executives Salaries', 'নির্বাহীদের বেতন', '0503003', 'Executives Salaries', 'Debit', 'No', '0503', '1', 'Active', 
	concat(v_ledger_sub_group_oid, '05-0503'), p_institute_oid, v_institute.created_by);
	INSERT INTO ledger(oid, name_en, name_bn, ledger_code, mnemonic, ledger_type, is_balance_sheet_item, 
	ledger_sub_group_code, version_id, status, ledger_sub_group_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_oid, '-05-0503-004'), 'Executives Commissions', 'নির্বাহী কমিশন', '0503004', 'Executives Commissions', 'Debit', 'No', '0503', '1', 'Active', 
	concat(v_ledger_sub_group_oid, '05-0503'), p_institute_oid, v_institute.created_by);
	INSERT INTO ledger(oid, name_en, name_bn, ledger_code, mnemonic, ledger_type, is_balance_sheet_item, 
	ledger_sub_group_code, version_id, status, ledger_sub_group_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_oid, '-05-0503-005'), 'Costs of Travel and Training', 'ভ্রমণ এবং প্রশিক্ষণের খরচ', '0503005', 'Costs of Travel and Training', 'Debit', 'No', '0503', '1', 'Active', 
	concat(v_ledger_sub_group_oid, '05-0503'), p_institute_oid, v_institute.created_by);
	INSERT INTO ledger(oid, name_en, name_bn, ledger_code, mnemonic, ledger_type, is_balance_sheet_item, 
	ledger_sub_group_code, version_id, status, ledger_sub_group_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_oid, '-05-0503-006'), 'Depreciation Expense', 'অবচয় ব্যয়', '0503006', 'Depreciation Expense', 'Debit', 'No', '0503', '1', 'Active', 
	concat(v_ledger_sub_group_oid, '05-0503'), p_institute_oid, v_institute.created_by);
	INSERT INTO ledger(oid, name_en, name_bn, ledger_code, mnemonic, ledger_type, is_balance_sheet_item, 
	ledger_sub_group_code, version_id, status, ledger_sub_group_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_oid, '-05-0503-007'), 'Other Expense', 'অন্যান্য খরচ', '0503007', 'Other Expense', 'Debit', 'No', '0503', '1', 'Active', 
	concat(v_ledger_sub_group_oid, '05-0503'), p_institute_oid, v_institute.created_by);
	INSERT INTO ledger(oid, name_en, name_bn, ledger_code, mnemonic, ledger_type, is_balance_sheet_item, 
	ledger_sub_group_code, version_id, status, ledger_sub_group_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_oid, '-05-0503-008'), 'Discount Expense', 'ডিসকাউন্ট খরচ', '0503008', 'Discount Expense', 'Debit', 'No', '0503', '1', 'Active', 
	concat(v_ledger_sub_group_oid, '05-0503'), p_institute_oid, v_institute.created_by);
	INSERT INTO ledger(oid, name_en, name_bn, ledger_code, mnemonic, ledger_type, is_balance_sheet_item, 
	ledger_sub_group_code, version_id, status, ledger_sub_group_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_oid, '-05-0503-009'), 'Penalties Waiver', 'জরিমানা মওকুফ ', '0503009', 'Penalties Waiver', 'Debit', 'No', '0503', '1', 'Active', 
	concat(v_ledger_sub_group_oid, '05-0503'), p_institute_oid, v_institute.created_by);
	INSERT INTO ledger(oid, name_en, name_bn, ledger_code, mnemonic, ledger_type, is_balance_sheet_item, 
	ledger_sub_group_code, version_id, status, ledger_sub_group_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_oid, '-05-0503-010'), 'Student Fee Waiver', 'স্টুডেন্ট বেতন মওকুফ ', '0503010', 'Student Fee Waiver', 'Debit', 'No', '0503', '1', 'Active', 
	concat(v_ledger_sub_group_oid, '05-0503'), p_institute_oid, v_institute.created_by);
	INSERT INTO ledger(oid, name_en, name_bn, ledger_code, mnemonic, ledger_type, is_balance_sheet_item, 
	ledger_sub_group_code, version_id, status, ledger_sub_group_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_oid, '-05-0503-011'), 'Academic Fee Waiver', 'একাডেমিক ফি মওকুফ', '0503011', 'Academic Fee Waiver', 'Debit', 'No', '0503', '1', 'Active', 
	concat(v_ledger_sub_group_oid, '05-0503'), p_institute_oid, v_institute.created_by);
	
	
	INSERT INTO ledger(oid, name_en, name_bn, ledger_code, mnemonic, ledger_type, is_balance_sheet_item, 
	ledger_sub_group_code, version_id, status, ledger_sub_group_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_oid, '-05-0503-012'), 'Travel Expenses', 'ভ্রমণ খরচ', '0503012', 'Travel Expenses', 'Debit', 'No', '0503', '1', 'Active', 
	concat(v_ledger_sub_group_oid, '05-0503'), p_institute_oid, v_institute.created_by);
	INSERT INTO ledger(oid, name_en, name_bn, ledger_code, mnemonic, ledger_type, is_balance_sheet_item, 
	ledger_sub_group_code, version_id, status, ledger_sub_group_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_oid, '-05-0503-013'), 'Training Expenses', 'প্রশিক্ষণের খরচ', '0503013', 'Training Expenses', 'Debit', 'No', '0503', '1', 'Active', 
	concat(v_ledger_sub_group_oid, '05-0503'), p_institute_oid, v_institute.created_by);
	INSERT INTO ledger(oid, name_en, name_bn, ledger_code, mnemonic, ledger_type, is_balance_sheet_item, 
	ledger_sub_group_code, version_id, status, ledger_sub_group_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_oid, '-05-0503-014'), 'Entertainment Expenses', 'আপ্যায়ণ খরচ', '0503014', 'Entertainment Expenses', 'Debit', 'No', '0503', '1', 'Active', 
	concat(v_ledger_sub_group_oid, '05-0503'), p_institute_oid, v_institute.created_by);
	INSERT INTO ledger(oid, name_en, name_bn, ledger_code, mnemonic, ledger_type, is_balance_sheet_item, 
	ledger_sub_group_code, version_id, status, ledger_sub_group_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_oid, '-05-0503-015'), 'Shipping Expense', 'শিপিং খরচ', '0503015', 'Shipping Expense', 'Debit', 'No', '0503', '1', 'Active', 
	concat(v_ledger_sub_group_oid, '05-0503'), p_institute_oid, v_institute.created_by);
	
	
	
        
	INSERT INTO ledger_sub_group(oid, name_en, name_bn, ledger_sub_group_code, ledger_sub_group_type, is_balance_sheet_item, 
	ledger_group_code, version_id, status, ledger_group_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_sub_group_oid, '05-0504'), 'Adjusting Entries - Payable Adjustment ', 'অ্যাডজাস্টিং এন্ট্রি - প্রদেয় সামঞ্জস্য', '0504', 'Debit', 'No', '05', '1', 'Active', 
	v_ledger_group_oid, p_institute_oid, v_institute.created_by);
	
	
	INSERT INTO ledger(oid, name_en, name_bn, ledger_code, mnemonic, ledger_type, is_balance_sheet_item, 
	ledger_sub_group_code, version_id, status, ledger_sub_group_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_oid, '-05-0504-001'), 'Adjustment of Accounts Payable', 'প্রদেয় হিসাব সমন্বয়', '0504001', 'Adjustment of Accounts Payable', 'Debit', 'No', '0504', '1', 'Active', 
	concat(v_ledger_sub_group_oid, '05-0504'), p_institute_oid, v_institute.created_by);
	
	
	INSERT INTO ledger(oid, name_en, name_bn, ledger_code, mnemonic, ledger_type, is_balance_sheet_item, 
	ledger_sub_group_code, version_id, status, ledger_sub_group_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_oid, '-05-0504-002'), 'Adjustment of Advance Received', 'প্রাপ্ত অগ্রিম সমন্বয়', '0504002', 'Adjustment of Advance Received', 'Debit', 'No', '0504', '1', 'Active', 
	concat(v_ledger_sub_group_oid, '05-0504'), p_institute_oid, v_institute.created_by);
	
	
	INSERT INTO ledger(oid, name_en, name_bn, ledger_code, mnemonic, ledger_type, is_balance_sheet_item, 
	ledger_sub_group_code, version_id, status, ledger_sub_group_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_oid, '-05-0504-003'), 'Adjustment of Salary Payable', 'প্রদেয় বেতনের সমন্বয়', '0504003', 'Adjustment of Salary Payable', 'Debit', 'No', '0504', '1', 'Active', 
	concat(v_ledger_sub_group_oid, '05-0504'), p_institute_oid, v_institute.created_by);
	
	
	-- Insert Ledger Setting
	INSERT INTO ledger_setting(oid, ledger_key, name_en, name_bn, ledger_name_en, ledger_name_bn, ledger_code, status, ledger_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_setting_oid, '-Cash'), 'Cash', 'Cash', 'নগদ', 'Cash', 'নগদ', '0101001', 'Active', 
	concat(v_ledger_oid, '-01-0101-001'), p_institute_oid, v_institute.created_by);
	INSERT INTO ledger_setting(oid, ledger_key, name_en, name_bn, ledger_name_en, ledger_name_bn, ledger_code, status, ledger_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_setting_oid, '-AccountReceivable'), 'AccountReceivable', 'Accounts Receivables', 'প্রাপ্য হিসাব', 'Accounts Receivables', 'প্রাপ্য হিসাব', '0101002', 'Active', 
	concat(v_ledger_oid, '-01-0101-002'), p_institute_oid, v_institute.created_by);
	INSERT INTO ledger_setting(oid, ledger_key, name_en, name_bn, ledger_name_en, ledger_name_bn, ledger_code, status, ledger_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_setting_oid, '-AcademicFee'), 'AcademicFee', 'Academic Fee', 'একাডেমিক ফি', 'Academic Fee', 'একাডেমিক ফি', '0101003', 'Active', 
	concat(v_ledger_oid, '-01-0101-003'), p_institute_oid, v_institute.created_by);
	INSERT INTO ledger_setting(oid, ledger_key, name_en, name_bn, ledger_name_en, ledger_name_bn, ledger_code, status, ledger_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_setting_oid, '-AcademicFine'), 'AcademicFine', 'Academic Fine', 'একাডেমিক ফাইন','Academic Fine', 'একাডেমিক ফাইন', '0101004', 'Active', 
	concat(v_ledger_oid, '-01-0101-004'), p_institute_oid, v_institute.created_by);
	INSERT INTO ledger_setting(oid, ledger_key, name_en, name_bn, ledger_name_en, ledger_name_bn, ledger_code, status, ledger_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_setting_oid, '-CashInBank'), 'CashInBank', 'Cash in Bank', 'ব্যাংকে নগদ','Cash in Bank', 'ব্যাংকে নগদ', '0101005', 'Active', 
	concat(v_ledger_oid, '-01-0101-005'), p_institute_oid, v_institute.created_by);
	INSERT INTO ledger_setting(oid, ledger_key, name_en, name_bn, ledger_name_en, ledger_name_bn, ledger_code, status, ledger_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_setting_oid, '-VendorCredit'), 'VendorCredit', 'Advance Payment', 'অগ্রিম পেমেন্ট','Advance Payment', 'অগ্রিম পেমেন্ট', '0101006', 'Active', 
	concat(v_ledger_oid, '-01-0101-006'), p_institute_oid, v_institute.created_by);
	
	INSERT INTO ledger_setting(oid, ledger_key, name_en, name_bn, ledger_name_en, ledger_name_bn, ledger_code, status, ledger_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_setting_oid, '-Inventory'), 'Inventory', 'Inventory', 'ইনভেন্টরি','Inventory', 'ইনভেন্টরি', '0102004', 'Active', 
	concat(v_ledger_oid, '-01-0102-004'), p_institute_oid, v_institute.created_by);
	
	INSERT INTO ledger_setting(oid, ledger_key, name_en, name_bn, ledger_name_en, ledger_name_bn, ledger_code, status, ledger_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_setting_oid, '-CreditNote'), 'CreditNote', 'Advance Received', 'অগ্রিম প্রাপ্ত','Advance Received', 'অগ্রিম প্রাপ্ত', '0201001', 'Active', 
	concat(v_ledger_oid, '-02-0201-001'), p_institute_oid, v_institute.created_by);
	INSERT INTO ledger_setting(oid, ledger_key, name_en, name_bn, ledger_name_en, ledger_name_bn, ledger_code, status, ledger_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_setting_oid, '-AccountPayable'), 'AccountPayable', 'Accounts Payables', 'প্রদেয় হিসাব','Accounts Payables', 'প্রদেয় হিসাব', '0201003', 'Active', 
	concat(v_ledger_oid, '-02-0201-003'), p_institute_oid, v_institute.created_by);
	INSERT INTO ledger_setting(oid, ledger_key, name_en, name_bn, ledger_name_en, ledger_name_bn, ledger_code, status, ledger_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_setting_oid, '-TaxPayable'), 'TaxPayable', 'Tax Payable', 'কর পরিশোধ যোগ্য হিসাব','Tax Payable', 'কর পরিশোধ যোগ্য হিসাব', '0201004', 'Active', 
	concat(v_ledger_oid, '-02-0201-004'), p_institute_oid, v_institute.created_by);
	INSERT INTO ledger_setting(oid, ledger_key, name_en, name_bn, ledger_name_en, ledger_name_bn, ledger_code, status, ledger_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_setting_oid, '-SalaryPayable'), 'SalaryPayable', 'Salary Payable', 'প্রদেয় বেতন হিসাব','Salary Payable', 'প্রদেয় বেতন হিসাব', '0201005', 'Active', 
	concat(v_ledger_oid, '-02-0201-005'), p_institute_oid, v_institute.created_by);
	
	INSERT INTO ledger_setting(oid, ledger_key, name_en, name_bn, ledger_name_en, ledger_name_bn, ledger_code, status, ledger_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_setting_oid, '-OwnersEquity'), 'OwnersEquity', 'Owners Equity', 'মালিকদের ইক্যুইটি', null, null, null, 'Active', null, p_institute_oid, v_institute.created_by);
	INSERT INTO ledger_setting(oid, ledger_key, name_en, name_bn, ledger_name_en, ledger_name_bn, ledger_code, status, ledger_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_setting_oid, '-RetainedEarning'), 'RetainedEarning', 'Retained Earning', 'রক্ষিত উপার্জন','Retained Earning', 'রক্ষিত উপার্জন', '0301002', 'Active', 
	concat(v_ledger_oid, '-03-0301-002'), p_institute_oid, v_institute.created_by);
	INSERT INTO ledger_setting(oid, ledger_key, name_en, name_bn, ledger_name_en, ledger_name_bn, ledger_code, status, ledger_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_setting_oid, '-DiscountEarned'), 'DiscountEarned', 'Discount Earned', 'অর্জিত ডিসকাউন্ট','Discount Earned', 'অর্জিত ডিসকাউন্ট', '0301003', 'Active', 
	concat(v_ledger_oid, '-03-0301-003'), p_institute_oid, v_institute.created_by);
	
	INSERT INTO ledger_setting(oid, ledger_key, name_en, name_bn, ledger_name_en, ledger_name_bn, ledger_code, status, ledger_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_setting_oid, '-AcademicFeeCollection'), 'AcademicFeeCollection', 'Academic Fee Collection', 'একাডেমিক ফি  আদায়','Academic Fee Collection', 'একাডেমিক ফি  আদায়', '0401001', 'Active', 
	concat(v_ledger_oid, '-04-0401-001'), p_institute_oid, v_institute.created_by);
	INSERT INTO ledger_setting(oid, ledger_key, name_en, name_bn, ledger_name_en, ledger_name_bn, ledger_code, status, ledger_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_setting_oid, '-AcademicFineCollection'), 'AcademicFineCollection', 'Academic Fine Collection', 'একাডেমিক ফাইন  আদায়',
	'Academic Fine Collection', 'একাডেমিক ফাইন  আদায়', '0401002', 'Active', 
	concat(v_ledger_oid, '-04-0401-002'), p_institute_oid, v_institute.created_by);
	INSERT INTO ledger_setting(oid, ledger_key, name_en, name_bn, ledger_name_en, ledger_name_bn, ledger_code, status, ledger_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_setting_oid, '-InvestmentRevenue'), 'InvestmentRevenue', 'Investment Revenue', 'বিনিয়োগ রাজস্ব','Investment Revenue', 'বিনিয়োগ রাজস্ব', '0402001', 'Active', 
	concat(v_ledger_oid, '-04-0402-001'), p_institute_oid, v_institute.created_by);
	INSERT INTO ledger_setting(oid, ledger_key, name_en, name_bn, ledger_name_en, ledger_name_bn, ledger_code, status, ledger_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_setting_oid, '-AssetRevenue'), 'AssetRevenue', 'Asset Revenue', 'সম্পদ রাজস্ব','Asset Revenue', 'সম্পদ রাজস্ব', '0403001', 'Active', 
	concat(v_ledger_oid, '-04-0403-001'), p_institute_oid, v_institute.created_by);
	INSERT INTO ledger_setting(oid, ledger_key, name_en, name_bn, ledger_name_en, ledger_name_bn, ledger_code, status, ledger_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_setting_oid, '-BusinessRevenue'), 'BusinessRevenue', 'Business Revenue', 'ব্যবসার রাজস্ব','Business Revenue', 'ব্যবসার রাজস্ব', '0404001', 'Active', 
	concat(v_ledger_oid, '-04-0404-001'), p_institute_oid, v_institute.created_by);
	INSERT INTO ledger_setting(oid, ledger_key, name_en, name_bn, ledger_name_en, ledger_name_bn, ledger_code, status, ledger_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_setting_oid, '-GovernmentFundSalaryCollection'), 'GovernmentFundSalaryCollection', 'Government funding for salaries', 
	'বেতন বাবদ সরকারি তহবিল','Government funding for salaries', 'বেতন বাবদ সরকারি তহবিল', '0405001', 'Active', 
	concat(v_ledger_oid, '-04-0405-001'), p_institute_oid, v_institute.created_by);
	INSERT INTO ledger_setting(oid, ledger_key, name_en, name_bn, ledger_name_en, ledger_name_bn, ledger_code, status, ledger_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_setting_oid, '-DonationCollection'), 'DonationCollection', 'Donation Collection', 'অনুদান আদায়','Donation Collection', 'অনুদান আদায়', '0406001', 'Active', 
	concat(v_ledger_oid, '-04-0406-001'), p_institute_oid, v_institute.created_by);
	
	
	INSERT INTO ledger_setting(oid, ledger_key, name_en, name_bn, ledger_name_en, ledger_name_bn, ledger_code, status, ledger_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_setting_oid, '-AdjustmentReceivable'), 'AdjustmentReceivable', 'Adjustment of Accounts Receivable', 'প্রাপ্য হিসাব সমন্বয়','Adjustment of Accounts Receivable', 
	'প্রাপ্য হিসাব সমন্বয়', '0407001', 'Active', concat(v_ledger_oid, '-04-0407-001'), p_institute_oid, v_institute.created_by);
	INSERT INTO ledger_setting(oid, ledger_key, name_en, name_bn, ledger_name_en, ledger_name_bn, ledger_code, status, ledger_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_setting_oid, '-AdjustmentVendorCredit'), 'AdjustmentVendorCredit', 'Adjustment of Advance Payment', 'অগ্রিম পেমেন্ট সমন্বয়', 'Adjustment of Advance Payment', 
	'অগ্রিম পেমেন্ট সমন্বয়', '0407002', 'Active', concat(v_ledger_oid, '-04-0407-002'), p_institute_oid, v_institute.created_by);
	
	
	INSERT INTO ledger_setting(oid, ledger_key, name_en, name_bn, ledger_name_en, ledger_name_bn, ledger_code, status, ledger_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_setting_oid, '-TaxExpense'), 'TaxExpense', 'Tax Expense', 'ট্যাক্স খরচ','Tax Expense', 'ট্যাক্স খরচ', '0501003', 'Active', 
	concat(v_ledger_oid, '-05-0501-003'), p_institute_oid, v_institute.created_by);
	INSERT INTO ledger_setting(oid, ledger_key, name_en, name_bn, ledger_name_en, ledger_name_bn, ledger_code, status, ledger_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_setting_oid, '-ExecutivesSalaries'), 'ExecutivesSalaries', 'Executives Salaries', 'নির্বাহীদের বেতন','Executives Salaries', 'নির্বাহীদের বেতন', '0503003', 'Active', 
	concat(v_ledger_oid, '-05-0503-003'), p_institute_oid, v_institute.created_by);
	INSERT INTO ledger_setting(oid, ledger_key, name_en, name_bn, ledger_name_en, ledger_name_bn, ledger_code, status, ledger_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_setting_oid, '-DiscountExpense'), 'DiscountExpense', 'Discount Expense', 'ডিসকাউন্ট খরচ','Discount Expense', 'ডিসকাউন্ট খরচ', '0503008', 'Active', 
	concat(v_ledger_oid, '-05-0503-008'), p_institute_oid, v_institute.created_by);
	INSERT INTO ledger_setting(oid, ledger_key, name_en, name_bn, ledger_name_en, ledger_name_bn, ledger_code, status, ledger_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_setting_oid, '-ShippingExpense'), 'ShippingExpense', 'Shipping Expense', 'শিপিং খরচ','Shipping Expense', 'শিপিং খরচ', '0503015', 'Active', 
	concat(v_ledger_oid, '-05-0503-015'), p_institute_oid, v_institute.created_by);
	INSERT INTO ledger_setting(oid, ledger_key, name_en, name_bn, ledger_name_en, ledger_name_bn, ledger_code, status, ledger_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_setting_oid, '-PenaltiesWaiver'), 'PenaltiesWaiver', 'Penalties Waiver', 'জরিমানা মওকুফ ','Penalties Waiver', 'জরিমানা মওকুফ ', '0503009', 'Active', 
	concat(v_ledger_oid, '-05-0503-009'), p_institute_oid, v_institute.created_by);
	INSERT INTO ledger_setting(oid, ledger_key, name_en, name_bn, ledger_name_en, ledger_name_bn, ledger_code, status, ledger_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_setting_oid, '-StudentFeeWaiver'), 'StudentFeeWaiver', 'Student Fee Waiver', 'স্টুডেন্ট বেতন মওকুফ ','Student Fee Waiver', 'স্টুডেন্ট বেতন মওকুফ ', '0503010', 'Active', 
	concat(v_ledger_oid, '-05-0503-010'), p_institute_oid, v_institute.created_by);
	INSERT INTO ledger_setting(oid, ledger_key, name_en, name_bn, ledger_name_en, ledger_name_bn, ledger_code, status, ledger_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_setting_oid, '-AcademicFeeWaiver'), 'AcademicFeeWaiver', 'Academic Fee Waiver', 'একাডেমিক ফি মওকুফ','Academic Fee Waiver', 'একাডেমিক ফি মওকুফ', '0503011', 'Active', 
	concat(v_ledger_oid, '-05-0503-011'), p_institute_oid, v_institute.created_by);
	INSERT INTO ledger_setting(oid, ledger_key, name_en, name_bn, ledger_name_en, ledger_name_bn, ledger_code, status, ledger_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_setting_oid, '-EntertainmentExpense'), 'EntertainmentExpense', 'Entertainment Expenses', 'আপ্যায়ণ খরচ','Entertainment Expenses', 'আপ্যায়ণ খরচ', '0503014', 'Active', 
	concat(v_ledger_oid, '-05-0503-014'), p_institute_oid, v_institute.created_by);
	INSERT INTO ledger_setting(oid, ledger_key, name_en, name_bn, ledger_name_en, ledger_name_bn, ledger_code, status, ledger_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_setting_oid, '-AdjustmentPayable'), 'AdjustmentPayable', 'Adjustment of Accounts Payable', 'প্রদেয় হিসাব সমন্বয়', 'Adjustment of Accounts Payable', 
	'প্রদেয় হিসাব সমন্বয়', '0504001', 'Active', concat(v_ledger_oid, '-05-0504-001'), p_institute_oid, v_institute.created_by);
	INSERT INTO ledger_setting(oid, ledger_key, name_en, name_bn, ledger_name_en, ledger_name_bn, ledger_code, status, ledger_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_setting_oid, '-AdjustmentCreditNote'), 'AdjustmentCreditNote', 'Adjustment of Advance Received', 'প্রাপ্ত অগ্রিম সমন্বয়', 'Adjustment of Advance Received', 
	'প্রাপ্ত অগ্রিম সমন্বয়', '0504002', 'Active', concat(v_ledger_oid, '-05-0504-002'), p_institute_oid, v_institute.created_by);
	INSERT INTO ledger_setting(oid, ledger_key, name_en, name_bn, ledger_name_en, ledger_name_bn, ledger_code, status, ledger_oid, institute_oid, created_by) 
	VALUES(concat(v_ledger_setting_oid, '-AdjustmentSalaryPayable'), 'AdjustmentSalaryPayable', 'Adjustment of Salary Payable', 'প্রদেয় বেতনের সমন্বয়', 'Adjustment of Salary Payable', 
	'প্রদেয় বেতনের সমন্বয়', '0504003', 'Active', concat(v_ledger_oid, '-05-0504-003'), p_institute_oid, v_institute.created_by);
	
    END;
$create_institute$ LANGUAGE plpgsql;
-- SELECT create_institute('10');

-- DROP FUNCTION IF EXISTS institute_shift_name_en(varchar(128));
CREATE OR REPLACE FUNCTION institute_shift_name_en(p_oid varchar(128))
RETURNS text AS $institute_shift_name_en$
    DECLARE
		shift_name_en			text := (select string_agg(name_en , ', ') from schoolerp.institute_shift where 1 = 1 and institute_oid = p_oid);
    BEGIN
      RETURN shift_name_en;
    END;
$institute_shift_name_en$ LANGUAGE plpgsql;
-- SELECT institute_shift_name_en('10');


-- DROP FUNCTION IF EXISTS institute_shift_name_bn(varchar(128));
CREATE OR REPLACE FUNCTION institute_shift_name_bn(p_oid varchar(128))
RETURNS text AS $institute_shift_name_bn$
    DECLARE
		shift_name_bn			text := (select string_agg(name_bn , ', ') from schoolerp.institute_shift where 1 = 1 and institute_oid = p_oid);
    BEGIN
      RETURN shift_name_bn;
    END;
$institute_shift_name_bn$ LANGUAGE plpgsql;
-- SELECT institute_shift_name_bn('10');


/*


CREATE OR REPLACE FUNCTION schoolerp.create_institute(instituteOid varchar(128), educationClassOid varchar(128), 
educationTypeOid varchar(128), educationGradingOid varchar(128))
RETURNS void AS $create_institute$
  declare
    	intitute_class_oid	varchar(128);
        eoid varchar(128);
        institute_grading_oid varchar(128);
	educationClassCursor CURSOR FOR SELECT * FROM schoolerp.education_class where oid = educationClassOid;
        educationTypeCursor CURSOR FOR SELECT * FROM schoolerp.education_type where oid = educationTypeOid; 
	educationGradingSystemCursor CURSOR FOR SELECT * FROM schoolerp.education_grading_system where oid = educationGradingOid; 
		
  BEGIN
   	  
      
   	for educationClass in educationClassCursor loop
    	intitute_class_oid = concat(v_eiin_oid, uuid());
     
        insert into "schoolerp".institute_class (oid, name_en, name_bn, institute_oid, institute_class_level_oid, education_class_oid, sort_order, status) 
        values (intitute_class_oid,educationClass.name_en,educationClass.name_bn,instituteOid,'SCHOOL-ERP-Institute-Level-Class-6',educationClass.oid ,1,'Active');
  	
        end loop;
   
   
        for educationType in educationTypeCursor loop
	eoid =  concat(v_eiin_oid, uuid());
	insert into schoolerp.institute_type (oid, institute_oid, status, education_type_oid) 
        values (eoid,'SCHOOL-ERP-Demo-School-001','Active', educationType.oid);
        
        end loop;
   
   	for educationGrading in educationGradingSystemCursor loop
	institute_grading_oid =  concat(v_eiin_oid, uuid());
	
	insert into schoolerp.institute_grading_system (oid, name_en, name_bn, grade_point_scale, 
	institute_oid, education_system_oid) 
        values (institute_grading_oid, educationGrading.name_en, educationGrading.name_bn, 
        educationGrading.grade_point_scale,instituteOid, educationGrading.education_system_oid);
   	
   	end loop;
   	
   END;
   
$create_institute$ LANGUAGE plpgsql;

--select  * FROM schoolerp.create_institute('SCHOOL-ERP-Demo-School-001', 'SCHOOL-ERP-Education-Program-Class-8', 
--'Education-Type-0004', 'Education-Grading-System-0003'); 

*/

