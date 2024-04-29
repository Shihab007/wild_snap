--DROP FUNCTION IF EXISTS voucher_journal(varchar(128));
CREATE OR REPLACE FUNCTION voucher_journal(p_oid varchar(128))
RETURNS void AS $voucher_journal$
    DECLARE
    	v_voucher				record;
        debit                           	json;
        credit                          	json;
        journal_list                    	json;
        v_journal_summary               	json;
        sortOrder		               	int4;
    	v_student_oid				varchar(128);
    	v_debit_ledger_oid			varchar(128);
    	v_credit_ledger_oid			varchar(128);
    	v_debit_sub_ledger_oid			varchar(128);
    	v_credit_sub_ledger_oid			varchar(128);
    	
    	
    BEGIN
    
        SELECT * INTO v_voucher FROM voucher WHERE oid = p_oid;
        SELECT oid INTO v_student_oid FROM student WHERE student_id = v_voucher.student_id;
              
    	SELECT ledger_oid INTO v_debit_ledger_oid FROM ledger_setting WHERE institute_oid = v_voucher.institute_oid and ledger_key = 'AcademicFee';
    	SELECT oid INTO v_debit_sub_ledger_oid from sub_ledger WHERE ledger_key = 'AcademicFee' and reference_oid = v_student_oid;
    	
    	SELECT ledger_oid INTO v_credit_ledger_oid FROM ledger_setting WHERE institute_oid = v_voucher.institute_oid and ledger_key = 'AcademicFeeCollection';
        
        sortOrder := 1;
	
	-- Debit
	SELECT JSON_BUILD_OBJECT(
	    'ledgerOid', v_debit_ledger_oid,
	    'journalType', 'Voucher',
	    'journalEntryNo', sortOrder,
	    'referenceNo', v_voucher.voucher_no,
	    'remarks', v_voucher.remarks,
	    'debitedAmount', v_voucher.due_amount,
	    'creditedAmount', 0,
	    'subLedgerOid', v_debit_sub_ledger_oid,
	    'referenceType', 'Student',
	    'referenceOid', v_student_oid
	) INTO debit;

	-- Credit
	SELECT JSON_BUILD_OBJECT(
	    'ledgerOid', v_credit_ledger_oid,
	    'journalType', 'Voucher',
	    'journalEntryNo', sortOrder,
	    'referenceNo', v_voucher.voucher_no,
	    'remarks', v_voucher.remarks,
	    'debitedAmount', 0,
	    'creditedAmount', v_voucher.due_amount,
	    'subLedgerOid', v_credit_sub_ledger_oid,
	    'referenceType', null,
	    'referenceOid', null
	) INTO credit;
	
	SELECT json_build_array(debit, credit) INTO journal_list;
	
	SELECT JSON_BUILD_OBJECT(
	    'journalType', 'Voucher',
	    'journalManner', 'Auto',
	    'remarks', v_voucher.remarks,
	    'amount', v_voucher.due_amount,
	    'referenceNo', v_voucher.voucher_no,
	    'instituteOid', v_voucher.institute_oid,
	    'createdBy', v_voucher.created_by,
	    'journalList', journal_list
	) INTO v_journal_summary;

	
	perform post_journal(v_journal_summary);
	
	--UPDATE schoolerp.voucher SET debit_ledger_oid = v_debit_ledger_oid, debit_sub_ledger_oid = v_debit_sub_ledger_oid, credit_ledger_oid = v_credit_ledger_oid, 
	--credit_sub_ledger_oid = v_credit_sub_ledger_oid WHERE oid = p_oid;
	
	
    END;
$voucher_journal$ LANGUAGE plpgsql;
-- SELECT voucher_journal('10');


--DROP FUNCTION IF EXISTS create_student_batch_voucher(varchar(128));
CREATE OR REPLACE FUNCTION create_student_batch_voucher(p_data text)
RETURNS void AS $create_student_batch_voucher_$
    DECLARE
    	v_json                          	json;
    	v_student                          	json;
        debit                           	json;
        credit                          	json;
        journal_list                    	json;
        v_journal_summary               	json;
        sortOrder		               	int4;
    	v_student_oid				varchar(128);
    	v_debit_ledger_oid			varchar(128);
    	v_credit_ledger_oid			varchar(128);
    	v_debit_sub_ledger_oid			varchar(128);
    	v_credit_sub_ledger_oid			varchar(128);
    	v_fee_due_oid				varchar(128);
    	v_fee_due_id				varchar(128);
	v_timestamp                     	varchar(128);
    	v_fee_setting				record;
    	v_fee_setting_detail			record;
    	v_voucher_oid				varchar(128);
    	v_voucher_no				varchar(128);
    	v_fee_due				record;
    	v_fee_due_detail			record;
    	
    	
    BEGIN
    
        SELECT p_data::json INTO v_json;              
    	SELECT ledger_oid INTO v_debit_ledger_oid FROM ledger_setting WHERE institute_oid = v_json->>'instituteOid' and ledger_key = 'AcademicFee';
    	SELECT ledger_oid INTO v_credit_ledger_oid FROM ledger_setting WHERE institute_oid =  v_json->>'instituteOid'  and ledger_key = 'AcademicFeeCollection';
        SELECT * INTO v_fee_setting FROM fee_setting WHERE oid = v_json->>'feeSettingOid';
    	
        sortOrder := 1;
          
        FOR v_student IN SELECT * FROM json_array_elements((v_json->>'studentList')::json) loop
        
		SELECT to_char(clock_timestamp(), 'YYYYMMDDHH24MISSMS') INTO v_timestamp;
		SELECT concat('SCHOOL-ERP-Fee-Due-', v_timestamp, '-', random_number()) INTO v_fee_due_oid;
		SELECT concat('FD-', random_number()) INTO v_fee_due_id;
        	
    		SELECT oid INTO v_debit_sub_ledger_oid from sub_ledger WHERE ledger_key = 'AcademicFee' and reference_oid = v_student.studentOid;
    		
		INSERT INTO schoolerp.fee_due(oid, fee_due_id, name_en, name_bn, fee_due_date, payment_last_date, fee_amount, waiver_amount, discount_amount, due_amount, 
		remarks, status, student_id, institute_class_group_oid, institute_class_section_oid, institute_class_oid, institute_session_oid, billing_period, fee_setting_oid, fee_head_group_oid, 
		fee_head_group_code, institute_oid, created_by) VALUES(v_fee_due_oid, v_fee_due_id, v_json->>'voucherNameEn', v_json->>'voucherNameBn', now(), 
		v_json->>'paymentLastDate', v_json->>'feeAmount', v_student.waiver_amount, v_student.discount_amount, v_student.due_amount, 'Admission Fee', 
		'Due', (select student_id from student where oid = v_student.studentOid), v_student.instituteClassGroupOid, v_student.instituteClassSectionOid, 
		v_json->>'instituteClassOid', v_json->>'instituteSessionOid', v_json->>'billingPeriod', v_json->>'feeSettingOid', v_json->>'feeHeadGroupOid', 
		v_json->>'feeHeadGroupCode', v_json->>'instituteOid', v_json->>'createdBy');
		
		for v_fee_setting_detail in (SELECT * FROM schoolerp.fee_setting_detail fsd where fsd.fee_setting_oid = v_json->>'feeSettingOid') loop 
		
			INSERT INTO schoolerp.fee_due_detail(oid, fee_amount, fee_head_oid, fee_due_oid, institute_oid, created_by) 
			VALUES(concat('SCHOOL-ERP-FD-Detail-', v_timestamp, '-', random_number()), v_fee_setting_detail.amount, 
			v_fee_setting_detail.fee_head_oid, v_fee_due_oid, v_json->>'instituteOid', v_json->>'createdBy');
		end loop;
		
		
		SELECT concat('SCHOOL-ERP-Voucher-', v_timestamp, '-', random_number()) INTO v_voucher_oid;
		SELECT concat('V-', random_number()) INTO v_voucher_no;
        	SELECT * INTO v_fee_due FROM fee_due WHERE oid = v_fee_due_oid;
		
		INSERT INTO schoolerp.voucher(oid, voucher_no, name_en, name_bn, voucher_date, payment_last_date, fee_amount, waiver_amount, discount_amount, due_amount, paid_amount, 
		remarks, status, debit_ledger_oid, debit_sub_ledger_oid, credit_ledger_oid, credit_sub_ledger_oid, fee_due_oid, student_id, institute_class_group_oid, 
		institute_class_section_oid, institute_class_oid, institute_session_oid, fee_head_group_oid, fee_head_group_code, institute_oid, created_by) 
		VALUES(v_voucher_oid, v_voucher_no, v_fee_due.name_en, v_fee_due.name_bn, now(), v_fee_due.payment_last_date, v_fee_due.fee_amount, v_fee_due.waiver_amount, 
		v_fee_due.discount_amount, v_fee_due.due_amount, v_fee_due.paid_amount, 'Student Admission Fee', 'Due', v_debit_ledger_oid, v_debit_sub_ledger_oid, v_credit_ledger_oid, 
		v_credit_sub_ledger_oid, v_fee_due_oid, v_fee_due.student_id, v_fee_due.institute_class_group_oid, v_fee_due.institute_class_section_oid, 
		v_fee_due.institute_class_oid, v_fee_due.institute_session_oid, v_fee_due.fee_head_group_oid, v_fee_due.fee_head_group_code, v_fee_due.institute_oid, p_created_by);

		for v_fee_due_detail in (SELECT * FROM schoolerp.fee_due_detail fdd where fdd.fee_due_oid = v_fee_due_oid) loop 
			INSERT INTO schoolerp.voucher_detail(oid, fee_amount, fee_head_oid, vouchere_oid, institute_oid, created_by) 
			VALUES(concat('SCHOOL-ERP-VD-', v_timestamp, '-', random_number()), v_fee_due_detail.fee_amount, 
			v_fee_due_detail.fee_head_oid, v_voucher_oid, v_fee_due.institute_oid, p_created_by);
		end loop;
	
		-- Debit
		SELECT JSON_BUILD_OBJECT(
		    'ledgerOid', v_debit_ledger_oid,
		    'journalType', 'Voucher',
		    'journalEntryNo', 1,
		    'referenceNo', v_voucher_no,
		    'remarks', '',
		    'debitedAmount', v_student.due_amount,
		    'creditedAmount', 0,
		    'subLedgerOid', v_debit_sub_ledger_oid,
		    'referenceType', 'Student',
		    'referenceOid', v_student.studentOid
		) INTO debit;

		-- Credit
		SELECT JSON_BUILD_OBJECT(
		    'ledgerOid', v_credit_ledger_oid,
		    'journalType', 'Voucher',
		    'journalEntryNo', 1,
		    'referenceNo', v_voucher_no,
		    'remarks', '',
		    'debitedAmount', 0,
		    'creditedAmount', v_student.due_amount,
		    'subLedgerOid', v_credit_sub_ledger_oid,
		    'referenceType', null,
		    'referenceOid', null
		) INTO credit;
		
		SELECT json_build_array(debit, credit) INTO journal_list;
		
		SELECT JSON_BUILD_OBJECT(
		    'journalType', 'Voucher',
		    'journalManner', 'Auto',
		    'remarks', '',
		    'amount', v_student.due_amount,
		    'referenceNo', v_voucher_no,
		    'instituteOid', v_json->>'instituteOid',
		    'createdBy', v_json->>'createdBy',
		    'journalList', journal_list
		) INTO v_journal_summary;

		
		perform post_journal(v_journal_summary);
        
        END LOOP;
	
	--UPDATE schoolerp.voucher SET debit_ledger_oid = v_debit_ledger_oid, debit_sub_ledger_oid = v_debit_sub_ledger_oid, credit_ledger_oid = v_credit_ledger_oid, 
	--credit_sub_ledger_oid = v_credit_sub_ledger_oid WHERE oid = p_oid;
	
	
    END;
$create_student_batch_voucher_$ LANGUAGE plpgsql;
-- SELECT create_student_batch_voucher_('10');


--DROP FUNCTION IF EXISTS create_student_batch_voucher_by_oid(varchar(128));
CREATE OR REPLACE FUNCTION create_student_batch_voucher_by_oid(p_oid varchar(128))
RETURNS void AS $create_student_batch_voucher_by_oid$
    DECLARE
    	--v_json                          	record;
    	v_json                          	json;
    	v_student                          	json;
    	v_obj                          		text;
        debit                           	json;
        credit                          	json;
        journal_list                    	json;
        v_journal_summary               	json;
        sortOrder		               	int4;
    	v_student_oid				varchar(128);
    	v_debit_ledger_oid			varchar(128);
    	v_credit_ledger_oid			varchar(128);
    	v_debit_sub_ledger_oid			varchar(128);
    	v_credit_sub_ledger_oid			varchar(128);
    	v_fee_due_oid				varchar(128);
    	v_fee_due_id				varchar(128);
	v_timestamp                     	varchar(128);
    	v_fee_setting				record;
    	v_fee_setting_detail			record;
    	v_voucher_oid				varchar(128);
    	v_voucher_no				varchar(128);
    	v_fee_due				record;
    	v_fee_due_detail			record;
    	v_data_json				json;
    	v_student_list				text;
    	
    	
    BEGIN
    
	--SELECT data_json::json INTO v_data_json from temporary_data where oid = p_oid;
        --SELECT v_data_json::json INTO v_json;     
        SELECT (SELECT data_json from temporary_data where oid = p_oid)::json INTO v_json;
        
        select (((data_json::json->>'studentList')::json)::text) INTO v_student_list from temporary_data where oid = p_oid;
                    
    	SELECT ledger_oid INTO v_debit_ledger_oid FROM ledger_setting WHERE institute_oid = v_json->>'instituteOid' and ledger_key = 'AcademicFee';
    	SELECT ledger_oid INTO v_credit_ledger_oid FROM ledger_setting WHERE institute_oid =  v_json->>'instituteOid'  and ledger_key = 'AcademicFeeCollection';
        SELECT * INTO v_fee_setting FROM fee_setting WHERE oid = v_json->>'feeSettingOid';
    	
        sortOrder := 1;
        
        FOR v_obj IN (SELECT jsonb_array_elements((v_json::json->>'studentList')::jsonb)) loop
        	SELECT v_obj::json INTO v_student;     
     
        If (select count(oid) from schoolerp.fee_due WHERE billing_period = v_json->>'billingPeriod' and fee_setting_oid = v_json->>'feeSettingOid' 
        	and student_id = (select student_id from student where oid = v_student->>'studentOid')) = 0 THEN
        
		SELECT to_char(clock_timestamp(), 'YYYYMMDDHH24MISSMS') INTO v_timestamp;
		SELECT concat('SCHOOL-ERP-Fee-Due-', v_timestamp, '-', random_number()) INTO v_fee_due_oid;
		SELECT concat('FD-', random_number()) INTO v_fee_due_id;
        	
    		SELECT oid INTO v_debit_sub_ledger_oid from sub_ledger WHERE ledger_key = 'AcademicFee' and reference_oid = v_student->>'studentOid';
    		
		INSERT INTO schoolerp.fee_due(oid, fee_due_id, name_en, name_bn, fee_due_date, payment_last_date, fee_amount, waiver_amount, discount_amount, due_amount, 
		remarks, status, student_id, institute_class_group_oid, institute_class_section_oid, institute_class_oid, institute_session_oid, billing_period, fee_setting_oid, fee_head_group_oid, 
		fee_head_group_code, institute_oid, created_by) VALUES(v_fee_due_oid, v_fee_due_id, v_json->>'voucherNameEn', v_json->>'voucherNameBn', now(), 
		to_date(v_json->>'paymentLastDate', 'YYYY-MM-DD'), COALESCE((v_json->>'feeAmount')::float, 0), COALESCE((v_student->>'waiverAmount')::float, 0), 
		COALESCE((v_student->>'discountAmount')::float, 0), COALESCE((v_student->>'dueAmount')::float, 0), 'Admission Fee', 
		'Due', (select student_id from student where oid = v_student->>'studentOid'), NULLIF(v_student->>'instituteClassGroupOid', ''), v_student->>'instituteClassSectionOid', 
		v_json->>'instituteClassOid', v_json->>'instituteSessionOid', v_json->>'billingPeriod', v_json->>'feeSettingOid', v_json->>'feeHeadGroupOid', 
		v_json->>'feeHeadGroupCode', v_json->>'instituteOid', v_json->>'createdBy');
		
		for v_fee_setting_detail in (SELECT * FROM schoolerp.fee_setting_detail fsd where fsd.fee_setting_oid = v_json->>'feeSettingOid') loop 
		
			INSERT INTO schoolerp.fee_due_detail(oid, fee_amount, fee_head_oid, fee_due_oid, institute_oid, created_by) 
			VALUES(concat('SCHOOL-ERP-FD-Detail-', v_timestamp, '-', random_number()), v_fee_setting_detail.amount, 
			v_fee_setting_detail.fee_head_oid, v_fee_due_oid, v_json->>'instituteOid', v_json->>'createdBy');
		end loop;
		
		
		SELECT concat('SCHOOL-ERP-Voucher-', v_timestamp, '-', random_number()) INTO v_voucher_oid;
		SELECT concat('V-', random_number()) INTO v_voucher_no;
        	SELECT * INTO v_fee_due FROM fee_due WHERE oid = v_fee_due_oid;
		
		INSERT INTO schoolerp.voucher(oid, voucher_no, name_en, name_bn, voucher_date, payment_last_date, fee_amount, waiver_amount, discount_amount, due_amount, paid_amount, 
		remarks, status, debit_ledger_oid, debit_sub_ledger_oid, credit_ledger_oid, credit_sub_ledger_oid, fee_due_oid, student_id, institute_class_group_oid, 
		institute_class_section_oid, institute_class_oid, institute_session_oid, fee_head_group_oid, fee_head_group_code, institute_oid, created_by) 
		VALUES(v_voucher_oid, v_voucher_no, v_fee_due.name_en, v_fee_due.name_bn, now(), v_fee_due.payment_last_date, v_fee_due.fee_amount, v_fee_due.waiver_amount, 
		v_fee_due.discount_amount, v_fee_due.due_amount, v_fee_due.paid_amount, 'Student Admission Fee', 'Due', v_debit_ledger_oid, v_debit_sub_ledger_oid, v_credit_ledger_oid, 
		v_credit_sub_ledger_oid, v_fee_due_oid, v_fee_due.student_id, v_fee_due.institute_class_group_oid, v_fee_due.institute_class_section_oid, 
		v_fee_due.institute_class_oid, v_fee_due.institute_session_oid, v_fee_due.fee_head_group_oid, v_fee_due.fee_head_group_code, v_fee_due.institute_oid, v_json->>'createdBy');

		for v_fee_due_detail in (SELECT * FROM schoolerp.fee_due_detail fdd where fdd.fee_due_oid = v_fee_due_oid) loop 
			INSERT INTO schoolerp.voucher_detail(oid, fee_amount, fee_head_oid, vouchere_oid, institute_oid, created_by) 
			VALUES(concat('SCHOOL-ERP-VD-', v_timestamp, '-', random_number()), v_fee_due_detail.fee_amount, 
			v_fee_due_detail.fee_head_oid, v_voucher_oid, v_fee_due.institute_oid, v_json->>'createdBy');
		end loop;
	
		-- Debit
		SELECT JSON_BUILD_OBJECT(
		    'ledgerOid', v_debit_ledger_oid,
		    'journalType', 'Voucher',
		    'journalEntryNo', 1,
		    'referenceNo', v_voucher_no,
		    'remarks', '',
		    'debitedAmount', COALESCE((v_student->>'dueAmount')::float, 0),
		    'creditedAmount', 0,
		    'subLedgerOid', v_debit_sub_ledger_oid,
		    'referenceType', 'Student',
		    'referenceOid', v_student->>'studentOid'
		) INTO debit;

		-- Credit
		SELECT JSON_BUILD_OBJECT(
		    'ledgerOid', v_credit_ledger_oid,
		    'journalType', 'Voucher',
		    'journalEntryNo', 1,
		    'referenceNo', v_voucher_no,
		    'remarks', '',
		    'debitedAmount', 0,
		    'creditedAmount', COALESCE((v_student->>'dueAmount')::float, 0),
		    'subLedgerOid', v_credit_sub_ledger_oid,
		    'referenceType', null,
		    'referenceOid', null
		) INTO credit;
		
		SELECT json_build_array(debit, credit) INTO journal_list;
		
		SELECT JSON_BUILD_OBJECT(
		    'journalType', 'Voucher',
		    'journalManner', 'Auto',
		    'remarks', '',
		    'amount', COALESCE((v_student->>'dueAmount')::float, 0),
		    'referenceNo', v_voucher_no,
		    'instituteOid', v_json->>'instituteOid',
		    'createdBy', v_json->>'createdBy',
		    'journalList', journal_list
		) INTO v_journal_summary;

		
		perform post_journal(v_journal_summary);
        END IF;
        
        END LOOP;
	
	--UPDATE schoolerp.voucher SET debit_ledger_oid = v_debit_ledger_oid, debit_sub_ledger_oid = v_debit_sub_ledger_oid, credit_ledger_oid = v_credit_ledger_oid, 
	--credit_sub_ledger_oid = v_credit_sub_ledger_oid WHERE oid = p_oid;
	
	
    END;
$create_student_batch_voucher_by_oid$ LANGUAGE plpgsql;
-- SELECT create_student_batch_voucher_by_oid('10');


--DROP FUNCTION IF EXISTS student_voucher_payment_by_fee_due_oid(p_admission_oid varchar(128), p_created_by varchar(128));
CREATE OR REPLACE FUNCTION student_voucher_payment_by_fee_due_oid(p_fee_due_oid varchar(128), p_created_by varchar(128))
RETURNS void AS $student_voucher_payment_by_fee_due_oid$
    DECLARE
    	v_fee_due				record;
    	v_fee_due_detail			record;
    	v_student				record;
        debit                           	json;
        credit                          	json;
        journal_list                    	json;
        v_journal_summary               	json;
	v_timestamp                     	varchar(128);
    	v_voucher_oid				varchar(128);
    	v_voucher_no				varchar(128);
    	v_payment_oid				varchar(128);
    	v_payment_id				varchar(128);
    	v_debit_ledger_oid			varchar(128);
    	v_credit_ledger_oid			varchar(128);
    	v_debit_sub_ledger_oid			varchar(128);
    	v_credit_sub_ledger_oid			varchar(128);
    	
    	
    BEGIN
    
        SELECT to_char(clock_timestamp(), 'YYYYMMDDHH24MISSMS') INTO v_timestamp;
        SELECT concat('SCHOOL-ERP-Voucher-', v_timestamp, '-', random_number()) INTO v_voucher_oid;
        SELECT concat('V-', random_number()) INTO v_voucher_no;
        
    
        SELECT * INTO v_fee_due FROM fee_due WHERE oid = p_fee_due_oid;
        SELECT * INTO v_student FROM student WHERE student_id = v_fee_due.student_id;
        
        
    	
    	SELECT ledger_oid INTO v_debit_ledger_oid FROM ledger_setting WHERE institute_oid = v_fee_due.institute_oid and ledger_key = 'AcademicFee';
    	SELECT ledger_oid INTO v_credit_ledger_oid FROM ledger_setting WHERE institute_oid = v_fee_due.institute_oid and ledger_key = 'AcademicFeeCollection';	
    	SELECT oid INTO v_debit_sub_ledger_oid FROM sub_ledger WHERE ledger_key = 'AcademicFee' and reference_oid = v_student.oid;
    	
    	UPDATE schoolerp.fee_due SET debit_ledger_oid = v_debit_ledger_oid, debit_sub_ledger_oid = v_debit_sub_ledger_oid, credit_ledger_oid= v_credit_ledger_oid, 
    	credit_sub_ledger_oid = v_credit_sub_ledger_oid, updated_by = p_created_by, updated_on = current_timestamp WHERE oid = p_fee_due_oid;
	
		INSERT INTO schoolerp.voucher(oid, voucher_no, name_en, name_bn, voucher_date, payment_last_date, fee_amount, waiver_amount, discount_amount, due_amount, paid_amount, 
		remarks, status, debit_ledger_oid, debit_sub_ledger_oid, credit_ledger_oid, credit_sub_ledger_oid, fee_due_oid, student_id, institute_class_group_oid, 
		institute_class_section_oid, institute_class_oid, institute_session_oid, fee_head_group_oid, fee_head_group_code, institute_oid, created_by) 
		VALUES(v_voucher_oid, v_voucher_no, v_fee_due.name_en, v_fee_due.name_bn, now(), v_fee_due.payment_last_date, v_fee_due.fee_amount, v_fee_due.waiver_amount, 
		v_fee_due.discount_amount, v_fee_due.due_amount, v_fee_due.paid_amount, 'Student Admission Fee', 'Due', v_debit_ledger_oid, v_debit_sub_ledger_oid, v_credit_ledger_oid, 
		v_credit_sub_ledger_oid, p_fee_due_oid, v_fee_due.student_id, v_fee_due.institute_class_group_oid, v_fee_due.institute_class_section_oid, 
		v_fee_due.institute_class_oid, v_fee_due.institute_session_oid, v_fee_due.fee_head_group_oid, v_fee_due.fee_head_group_code, v_fee_due.institute_oid, p_created_by);
	
		for v_fee_due_detail in (SELECT * FROM schoolerp.fee_due_detail fdd where fdd.fee_due_oid = p_fee_due_oid) loop 
			INSERT INTO schoolerp.voucher_detail(oid, fee_amount, fee_head_oid, vouchere_oid, institute_oid, created_by) 
			VALUES(concat('SCHOOL-ERP-VD-', v_timestamp, '-', random_number()), v_fee_due_detail.fee_amount, 
			v_fee_due_detail.fee_head_oid, v_voucher_oid, v_fee_due.institute_oid, p_created_by);
		end loop;
			
		-- Debit
		SELECT JSON_BUILD_OBJECT(
		    'ledgerOid', v_debit_ledger_oid,
		    'journalType', 'AcademicFee',
		    'journalEntryNo', 1,
		    'referenceNo', v_voucher_no,
		    'remarks', '',
		    'debitedAmount', v_fee_due.fee_amount,
		    'creditedAmount', 0,
		    'subLedgerOid', (select oid from sub_ledger where ledger_key = 'AcademicFee' and reference_oid = v_student.oid),
		    'referenceType', 'Student',
		    'referenceOid', v_student.oid
		) INTO debit;
	
		-- Credit
		SELECT JSON_BUILD_OBJECT(
		    'ledgerOid', v_credit_ledger_oid,
		    'journalType', 'AcademicFee',
		    'journalEntryNo', 1,
		    'referenceNo', v_student.student_id,
		    'remarks', '',
		    'debitedAmount', 0,
		    'creditedAmount', v_fee_due.fee_amount
		    --'subLedgerOid', v_expense.sub_ledger_oid
		) INTO credit;
		
		SELECT json_build_array(debit, credit) INTO journal_list;
		
		SELECT JSON_BUILD_OBJECT(
		    'journalType', 'AcademicFee',
		    'journalManner', 'Auto',
		    'remarks', '',
		    'amount', v_fee_due.fee_amount,
		    'referenceNo', v_student.student_id,
		    'instituteOid', v_fee_due.institute_oid,
		    'createdBy', p_created_by,
		    'journalList', journal_list
		) INTO v_journal_summary;
	
		
		perform post_journal(v_journal_summary);
	
	
	
        IF coalesce((v_fee_due.waiver_amount)::float, 0) > 0 THEN
		
		-- Debit
		SELECT JSON_BUILD_OBJECT(
		    'ledgerOid', (SELECT ledger_oid FROM ledger_setting WHERE institute_oid = v_fee_due.institute_oid and ledger_key = 'AcademicFeeWaiver'),
		    'journalType', 'AcademicFeeWaiver',
		    'journalEntryNo', 1,
		    'referenceNo', v_voucher_no,
		    'remarks', '',
		    'debitedAmount', v_fee_due.waiver_amount,
		    'creditedAmount', 0
		    --'subLedgerOid', (select oid from sub_ledger where ledger_key = 'AcademicFee' and reference_oid = v_student.oid),
		    --'referenceType', 'Student',
		    --'referenceOid', v_student.oid
		) INTO debit;

		-- Credit
		SELECT JSON_BUILD_OBJECT(
		    'ledgerOid', (SELECT ledger_oid FROM ledger_setting WHERE institute_oid = v_fee_due.institute_oid and ledger_key = 'AcademicFee'),
		    'journalType', 'AcademicFeeWaiver',
		    'journalEntryNo', 1,
		    'referenceNo', v_student.student_id,
		    'remarks', '',
		    'debitedAmount', 0,
		    'creditedAmount', v_fee_due.waiver_amount,
		    'subLedgerOid', (select oid from sub_ledger where ledger_key = 'AcademicFee' and reference_oid = v_student.oid),
		    'referenceType', 'Student',
		    'referenceOid', v_student.oid
		) INTO credit;
		
		SELECT json_build_array(debit, credit) INTO journal_list;
		
		SELECT JSON_BUILD_OBJECT(
		    'journalType', 'AcademicFeeWaiver',
		    'journalManner', 'Auto',
		    'remarks', '',
		    'amount', v_fee_due.waiver_amount,
		    'referenceNo', v_voucher_no,
		    'instituteOid', v_fee_due.institute_oid,
		    'createdBy', p_created_by,
		    'journalList', journal_list
		) INTO v_journal_summary;
		
		perform post_journal(v_journal_summary);
		
        END IF;
        
        IF coalesce((v_fee_due.discount_amount)::float, 0) > 0 THEN
		
		-- Debit
		SELECT JSON_BUILD_OBJECT(
		    'ledgerOid', (SELECT ledger_oid FROM ledger_setting WHERE institute_oid = v_fee_due.institute_oid and ledger_key = 'DiscountExpense'),
		    'journalType', 'AcademicFeeDiscount',
		    'journalEntryNo', 1,
		    'referenceNo', v_voucher_no,
		    'remarks', '',
		    'debitedAmount', v_fee_due.discount_amount,
		    'creditedAmount', 0
		    --'subLedgerOid', (select oid from sub_ledger where ledger_key = 'AcademicFee' and reference_oid = v_student.oid),
		    --'referenceType', 'Student',
		    --'referenceOid', v_student.oid
		) INTO debit;

		-- Credit
		SELECT JSON_BUILD_OBJECT(
		    'ledgerOid', (SELECT ledger_oid FROM ledger_setting WHERE institute_oid = v_fee_due.institute_oid and ledger_key = 'AcademicFee'),
		    'journalType', 'AcademicFeeDiscount',
		    'journalEntryNo', 1,
		    'referenceNo', v_student.student_id,
		    'remarks', '',
		    'debitedAmount', 0,
		    'creditedAmount', v_fee_due.discount_amount,
		    'subLedgerOid', (select oid from sub_ledger where ledger_key = 'AcademicFee' and reference_oid = v_student.oid),
		    'referenceType', 'Student',
		    'referenceOid', v_student.oid
		) INTO credit;
		
		SELECT json_build_array(debit, credit) INTO journal_list;
		
		SELECT JSON_BUILD_OBJECT(
		    'journalType', 'AcademicFeeDiscount',
		    'journalManner', 'Auto',
		    'remarks', '',
		    'amount', v_fee_due.discount_amount,
		    'referenceNo', v_voucher_no,
		    'instituteOid', v_fee_due.institute_oid,
		    'createdBy', p_created_by,
		    'journalList', journal_list
		) INTO v_journal_summary;
		
		perform post_journal(v_journal_summary);
        
        END IF;
        
        IF coalesce((v_fee_due.paid_amount)::float, 0) > 0 THEN
        
		SELECT concat('SCHOOL-ERP-Payment-', v_timestamp, '-', random_number()) INTO v_payment_oid;
		SELECT concat('P-', random_number()) INTO v_payment_id;
        
		INSERT INTO schoolerp.payment(oid, payment_id, payment_date, payment_mode, transaction_type, transaction_no, bank_account_no, mobile_no, paid_amount, 
		remarks, status, debit_ledger_oid, debit_sub_ledger_oid, credit_ledger_oid, credit_sub_ledger_oid, student_id, institute_oid, created_by) 
		VALUES(v_payment_oid, v_payment_id, now(), 'Cash', 'Cash', null, null, null, v_fee_due.paid_amount, 'Student Admission Fee Collection', 'Active', 
		v_debit_ledger_oid, v_debit_sub_ledger_oid, v_credit_ledger_oid, v_credit_sub_ledger_oid, v_fee_due.student_id, v_fee_due.institute_oid, p_created_by);
        
		INSERT INTO schoolerp.payment_detail(oid, fee_amount, paid_amount, status, voucher_oid, payment_oid, institute_oid, created_by) 
		VALUES(concat('SCHOOL-ERP-VD-', v_timestamp, '-', random_number()), v_fee_due.fee_amount, v_fee_due.paid_amount, 'Active', 
		v_voucher_oid, v_payment_oid, v_fee_due.institute_oid, p_created_by);
		
		-- Debit
		SELECT JSON_BUILD_OBJECT(
		    'ledgerOid', (SELECT ledger_oid FROM ledger_setting WHERE institute_oid = v_fee_due.institute_oid and ledger_key = 'Cash'),
		    'journalType', 'AcademicFeePayment',
		    'journalEntryNo', 1,
		    'referenceNo', v_payment_id,
		    'remarks', '',
		    'debitedAmount', v_fee_due.paid_amount,
		    'creditedAmount', 0
		    --'subLedgerOid', (select oid from sub_ledger where ledger_key = 'AcademicFee' and reference_oid = v_student.oid),
		    --'referenceType', 'Student',
		    --'referenceOid', v_student.oid
		) INTO debit;

		-- Credit
		SELECT JSON_BUILD_OBJECT(
		    'ledgerOid', (SELECT ledger_oid FROM ledger_setting WHERE institute_oid = v_fee_due.institute_oid and ledger_key = 'AcademicFee'),
		    'journalType', 'AcademicFeePayment',
		    'journalEntryNo', 1,
		    'referenceNo', v_student.student_id,
		    'remarks', '',
		    'debitedAmount', 0,
		    'creditedAmount', v_fee_due.paid_amount,
		    'subLedgerOid', (select oid from sub_ledger where ledger_key = 'AcademicFee' and reference_oid = v_student.oid),
		    'referenceType', 'Student',
		    'referenceOid', v_student.oid
		) INTO credit;
		
		SELECT json_build_array(debit, credit) INTO journal_list;
		
		SELECT JSON_BUILD_OBJECT(
		    'journalType', 'AcademicFeePayment',
		    'journalManner', 'Auto',
		    'remarks', '',
		    'amount', v_fee_due.paid_amount,
		    'referenceNo', v_payment_id,
		    'instituteOid', v_fee_due.institute_oid,
		    'createdBy', p_created_by,
		    'journalList', journal_list
		) INTO v_journal_summary;
		
		perform post_journal(v_journal_summary);
        
        END IF;
	
    END;
$student_voucher_payment_by_fee_due_oid$ LANGUAGE plpgsql;
-- SELECT student_voucher_payment_by_fee_due_oid('10', '10');




