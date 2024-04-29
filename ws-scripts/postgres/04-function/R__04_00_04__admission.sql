--DROP FUNCTION IF EXISTS admission_student_selection(p_admission_oid varchar(128), p_fee_setting_oid varchar(128), p_created_by varchar(128));
CREATE OR REPLACE FUNCTION admission_student_selection(p_admission_oid varchar(128), p_fee_setting_oid varchar(128), p_created_by varchar(128))
RETURNS void AS $admission_student_selection$
    DECLARE
    	v_fee_setting				record;
    	v_fee_setting_detail			record;
    	v_admission				record;
	v_timestamp                     	varchar(128);
    	v_fee_due_oid				varchar(128);
    	v_fee_due_id				varchar(128);
    	
    	
    BEGIN
    
        SELECT to_char(clock_timestamp(), 'YYYYMMDDHH24MISSMS') INTO v_timestamp;
        SELECT concat('SCHOOL-ERP-Fee-Due-', v_timestamp, '-', random_number()) INTO v_fee_due_oid;
        SELECT concat('FD-', random_number()) INTO v_fee_due_id;
    
        SELECT * INTO v_fee_setting FROM fee_setting WHERE oid = p_fee_setting_oid;
        SELECT * INTO v_admission FROM institute_admission WHERE oid = p_admission_oid;
	
	INSERT INTO schoolerp.fee_due(oid, application_tracking_id, fee_due_id, name_en, name_bn, fee_due_date, payment_last_date, 
	fee_amount, due_amount, remarks, status, institute_class_group_oid, institute_class_oid, institute_session_oid, billing_period, 
	fee_setting_oid, fee_head_group_oid, fee_head_group_code, institute_oid, created_by) 
	VALUES(v_fee_due_oid, v_admission.admission_id, v_fee_due_id, v_fee_setting.name_en, v_fee_setting.name_bn, now(), v_fee_setting.payment_last_date, 
	v_fee_setting.amount, v_fee_setting.amount, 'Admission Fee', 'Pending', v_admission.institute_class_group_oid, v_admission.institute_class_oid, 
	v_admission.institute_session_oid, to_char(clock_timestamp(), 'YYYY'), 
	p_fee_setting_oid, v_fee_setting.fee_head_group_oid, v_fee_setting.fee_head_group_code, v_fee_setting.institute_oid, p_created_by);

	for v_fee_setting_detail in (SELECT * FROM schoolerp.fee_setting_detail fsd where fsd.fee_setting_oid = p_fee_setting_oid) loop 
	
		INSERT INTO schoolerp.fee_due_detail(oid, fee_amount, fee_head_oid, fee_due_oid, institute_oid, created_by) 
		VALUES(concat('SCHOOL-ERP-FD-Detail-', v_timestamp, '-', random_number()), v_fee_setting_detail.amount, 
		v_fee_setting_detail.fee_head_oid, v_fee_due_oid, v_fee_setting.institute_oid, p_created_by);
	end loop;
	
    END;
$admission_student_selection$ LANGUAGE plpgsql;
-- SELECT admission_student_selection('10', '10', '10');



--DROP FUNCTION IF EXISTS admission_student_approve(p_admission_oid varchar(128), p_fee_setting_oid varchar(128), p_created_by varchar(128), payment_status varchar(128));
CREATE OR REPLACE FUNCTION schoolerp.admission_student_approve(p_fee_due_oid character varying, p_created_by character varying, payment_status character varying)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
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
	v_fee_due.discount_amount, v_fee_due.due_amount, v_fee_due.paid_amount, 'Student Admission Fee', payment_status, v_debit_ledger_oid, v_debit_sub_ledger_oid, v_credit_ledger_oid, 
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
$function$;

-- SELECT admission_student_approve('10', '10','due');




