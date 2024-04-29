--DROP FUNCTION IF EXISTS create_student_sub_ledger(varchar(128));
CREATE OR REPLACE FUNCTION create_student_sub_ledger(p_student_oid varchar(128), p_institute_oid varchar(128), p_created_by varchar(128))
RETURNS void AS $create_student_sub_ledger$
    DECLARE
    	v_institute				record;	
    	v_student				record;
    	v_academic_fee_ledger_setting		record;
    	v_academic_fine_ledger_setting		record;    	
    	v_academic_fee_ledger			record;
    	v_academic_fine_ledger			record;
        v_timestamp                     	varchar(128);
    	v_sub_ledger_code			varchar(128);
        v_eiin_oid            			varchar(64);
        debit                           	json;
        credit                          	json;
        journal_list                    	json;
        v_journal_summary               	json;    
        v_due_amount				numeric(10,0);	
        v_paid_amount				numeric(10,0); 	
    	v_academic_fee_sub_ledger_oid		varchar(128);
    	
    BEGIN
    
        SELECT to_char(clock_timestamp(), 'YYYYMMDDHH24MISSMS') INTO v_timestamp;
        SELECT * INTO v_student FROM student WHERE oid = p_student_oid;
        SELECT * INTO v_institute FROM institute WHERE oid = p_institute_oid;
        
        
        SELECT sum(due_amount) INTO v_due_amount FROM due_fees WHERE institute_oid = p_institute_oid and student_oid = v_student.oid;
        --SELECT sum(paid_amount) INTO v_paid_amount FROM due_fees WHERE institute_oid = p_institute_oid and student_oid = v_student.oid;
        
        SELECT concat('SCHOOL-ERP-', v_institute.eiin_number, '-Sub-LGR-') INTO v_eiin_oid;
        SELECT concat(v_eiin_oid, uuid()) INTO v_academic_fee_sub_ledger_oid;
        
        SELECT * INTO v_academic_fee_ledger_setting FROM ledger_setting WHERE institute_oid = p_institute_oid and ledger_key = 'AcademicFee';
        SELECT * INTO v_academic_fine_ledger_setting FROM ledger_setting WHERE institute_oid = p_institute_oid and ledger_key = 'AcademicFine';
         
        SELECT * INTO v_academic_fee_ledger FROM ledger WHERE institute_oid = p_institute_oid and oid = v_academic_fee_ledger_setting.ledger_oid;
        SELECT * INTO v_academic_fine_ledger FROM ledger WHERE institute_oid = p_institute_oid and oid = v_academic_fine_ledger_setting.ledger_oid;
        
        
        select case when count(*)+1 > 9 then concat(v_academic_fee_ledger.ledger_code, (count(*)+1)) :: text 
        else concat(v_academic_fee_ledger.ledger_code, '0', (count(*)+1)) :: text end INTO v_sub_ledger_code 
        from sub_ledger sl where sl.ledger_oid = v_academic_fee_ledger.oid;
        
	INSERT INTO sub_ledger(oid, ledger_key, name_en, name_bn, sub_ledger_code, mnemonic, sub_ledger_type, is_balance_sheet_item, 
	sub_ledger_balance, ledger_code, version_id, status, reference_type, reference_oid, ledger_oid, institute_oid, created_by)
	VALUES(v_academic_fee_sub_ledger_oid, 'AcademicFee', v_student.name_en, v_student.name_bn, v_sub_ledger_code, v_student.name_en, v_academic_fee_ledger.ledger_type, 
	v_academic_fee_ledger.is_balance_sheet_item, 0, v_academic_fee_ledger.ledger_code, v_academic_fee_ledger.version_id, 'Active', 'Student', p_student_oid, 
	v_academic_fee_ledger.oid, p_institute_oid, v_student.created_by);
	
	
        select case when count(*)+1 > 9 then concat(v_academic_fine_ledger.ledger_code, (count(*)+1)) :: text 
        else concat(v_academic_fine_ledger.ledger_code, '0', (count(*)+1)) :: text end INTO v_sub_ledger_code 
        from sub_ledger sl where sl.ledger_oid = v_academic_fine_ledger.oid;
        
	INSERT INTO sub_ledger(oid, ledger_key, name_en, name_bn, sub_ledger_code, mnemonic, sub_ledger_type, is_balance_sheet_item, 
	sub_ledger_balance, ledger_code, version_id, status, reference_type, reference_oid, ledger_oid, institute_oid, created_by)
	VALUES(concat(v_eiin_oid, uuid()), 'AcademicFine', v_student.name_en, v_student.name_bn, v_sub_ledger_code, v_student.name_en, v_academic_fine_ledger.ledger_type, 
	v_academic_fine_ledger.is_balance_sheet_item, 0, v_academic_fine_ledger.ledger_code, v_academic_fine_ledger.version_id, 'Active', 'Student', p_student_oid, 
	v_academic_fine_ledger.oid, p_institute_oid, v_student.created_by);
		
		
        IF v_due_amount > 0 THEN 
		-- Debit
		SELECT JSON_BUILD_OBJECT(
		    'ledgerOid', v_academic_fee_ledger.oid,
		    'journalType', 'Admission',
		    'journalEntryNo', 1,
		    'referenceNo', v_student.student_id,
		    'remarks', '',
		    'debitedAmount', v_due_amount,
		    'creditedAmount', 0,
		    'subLedgerOid', v_academic_fee_sub_ledger_oid,
		    'referenceType', 'Student',
		    'referenceOid', v_student.oid
		) INTO debit;

		-- Credit
		SELECT JSON_BUILD_OBJECT(
		    'ledgerOid', (SELECT ledger_oid FROM ledger_setting WHERE institute_oid = p_institute_oid and ledger_key = 'AcademicFeeCollection'),
		    'journalType', 'Admission',
		    'journalEntryNo', 1,
		    'referenceNo', v_student.student_id,
		    'remarks', '',
		    'debitedAmount', 0,
		    'creditedAmount', v_due_amount
		) INTO credit;
		
		SELECT json_build_array(debit, credit) INTO journal_list;
		
		
		SELECT JSON_BUILD_OBJECT(
		    'journalType', 'Admission',
		    'journalManner', 'Auto',
		    'remarks', '',
		    'amount', v_due_amount,
		    'referenceNo', v_student.student_id,
		    'instituteOid', p_institute_oid,
		    'createdBy', p_created_by,
		    'journalList', journal_list
		) INTO v_journal_summary;

		
		perform post_journal(v_journal_summary);
		
        END IF;
	
    END;
$create_student_sub_ledger$ LANGUAGE plpgsql;
-- SELECT create_student_sub_ledger('10', '10');


--DROP FUNCTION IF EXISTS create_teacher_sub_ledger(varchar(128));
CREATE OR REPLACE FUNCTION create_teacher_sub_ledger(p_oid varchar(128), p_institute_oid varchar(128))
RETURNS void AS $create_teacher_sub_ledger$
    DECLARE
    	v_institute				record;	
    	v_teacher				record;
    	v_account_receivable_ledger_setting	record;
    	v_account_payable_ledger_setting	record;	
    	v_credit_note_ledger_setting		record;
    	v_vendor_credit_ledger_setting		record;
    	v_salary_payable_ledger_setting		record;
    	v_account_receivable_ledger		record;
    	v_account_payable_ledger		record;	
    	v_credit_note_ledger			record;
    	v_vendor_credit_ledger			record;
    	v_salary_payable_ledger			record;
    	v_adjustment_receivable_ledger		record;
    	v_adjustment_payable_ledger		record;
    	v_adjustment_credit_note_ledger		record;
    	v_adjustment_vendor_credit_ledger	record;
    	v_adjustment_salary_payable_ledger	record;
    	v_financial_period			record;
    	v_sub_ledger				record;
        v_timestamp                     	varchar(128);
    	v_sub_ledger_code			varchar(128);
        v_eiin_oid            			varchar(64);
        v_journal_summary_oid                  	varchar(128);
    	
    	
    BEGIN
    
        SELECT to_char(clock_timestamp(), 'YYYYMMDDHH24MISSMS') INTO v_timestamp;
        SELECT * INTO v_teacher FROM teacher WHERE oid = p_oid;
        SELECT * INTO v_institute FROM institute WHERE oid = p_institute_oid;
        SELECT * INTO v_financial_period FROM financial_period WHERE institute_oid = p_institute_oid and status = 'Opened';
        
        SELECT concat('SCHOOL-ERP-', v_institute.eiin_number, '-Sub-LGR-') INTO v_eiin_oid;
        
        SELECT * INTO v_account_receivable_ledger_setting FROM ledger_setting WHERE institute_oid = p_institute_oid and ledger_key = 'AccountReceivable';
        SELECT * INTO v_account_payable_ledger_setting FROM ledger_setting WHERE institute_oid = p_institute_oid and ledger_key = 'AccountPayable';
        SELECT * INTO v_credit_note_ledger_setting FROM ledger_setting WHERE institute_oid = p_institute_oid and ledger_key = 'CreditNote';     
        SELECT * INTO v_vendor_credit_ledger_setting FROM ledger_setting WHERE institute_oid = p_institute_oid and ledger_key = 'VendorCredit';
        SELECT * INTO v_salary_payable_ledger_setting FROM ledger_setting WHERE institute_oid = p_institute_oid and ledger_key = 'SalaryPayable';
         
        SELECT * INTO v_account_receivable_ledger FROM ledger WHERE institute_oid = p_institute_oid and oid = v_account_receivable_ledger_setting.ledger_oid;
        SELECT * INTO v_account_payable_ledger FROM ledger WHERE institute_oid = p_institute_oid and oid = v_account_payable_ledger_setting.ledger_oid;
        SELECT * INTO v_credit_note_ledger FROM ledger WHERE institute_oid = p_institute_oid and oid = v_credit_note_ledger_setting.ledger_oid;
        SELECT * INTO v_vendor_credit_ledger FROM ledger WHERE institute_oid = p_institute_oid and oid = v_vendor_credit_ledger_setting.ledger_oid;
        SELECT * INTO v_salary_payable_ledger FROM ledger WHERE institute_oid = p_institute_oid and oid = v_salary_payable_ledger_setting.ledger_oid;
        
        
        select case when count(*)+1 > 9 then concat(v_account_receivable_ledger.ledger_code, (count(*)+1)) :: text 
        else concat(v_account_receivable_ledger.ledger_code, '0', (count(*)+1)) :: text end INTO v_sub_ledger_code 
        from sub_ledger sl where sl.ledger_oid = v_account_receivable_ledger.oid;
        
	INSERT INTO sub_ledger(oid, ledger_key, name_en, name_bn, sub_ledger_code, mnemonic, sub_ledger_type, is_balance_sheet_item, 
	sub_ledger_balance, ledger_code, version_id, status, reference_type, reference_oid, ledger_oid, institute_oid, created_by)
	VALUES(concat(v_eiin_oid, uuid()), 'AccountReceivable', v_teacher.name_en, v_teacher.name_bn, v_sub_ledger_code, v_teacher.name_en, v_account_receivable_ledger.ledger_type, 
	v_account_receivable_ledger.is_balance_sheet_item, 0, v_account_receivable_ledger.ledger_code, v_account_receivable_ledger.version_id, 'Active', 'Teacher', p_oid, 
	v_account_receivable_ledger.oid, p_institute_oid, v_teacher.created_by);
        
        
        select case when count(*)+1 > 9 then concat(v_account_payable_ledger.ledger_code, (count(*)+1)) :: text 
        else concat(v_account_payable_ledger.ledger_code, '0', (count(*)+1)) :: text end INTO v_sub_ledger_code 
        from sub_ledger sl where sl.ledger_oid = v_account_payable_ledger.oid;
        
	INSERT INTO sub_ledger(oid, ledger_key, name_en, name_bn, sub_ledger_code, mnemonic, sub_ledger_type, is_balance_sheet_item, 
	sub_ledger_balance, ledger_code, version_id, status, reference_type, reference_oid, ledger_oid, institute_oid, created_by)
	VALUES(concat(v_eiin_oid, uuid()), 'AccountPayable', v_teacher.name_en, v_teacher.name_bn, v_sub_ledger_code, v_teacher.name_en, v_account_payable_ledger.ledger_type, 
	v_account_payable_ledger.is_balance_sheet_item, 0, v_account_payable_ledger.ledger_code, v_account_payable_ledger.version_id, 'Active', 'Teacher', p_oid, 
	v_account_payable_ledger.oid, p_institute_oid, v_teacher.created_by);
        
        
        select case when count(*)+1 > 9 then concat(v_credit_note_ledger.ledger_code, (count(*)+1)) :: text 
        else concat(v_credit_note_ledger.ledger_code, '0', (count(*)+1)) :: text end INTO v_sub_ledger_code 
        from sub_ledger sl where sl.ledger_oid = v_credit_note_ledger.oid;
        
	INSERT INTO sub_ledger(oid, ledger_key, name_en, name_bn, sub_ledger_code, mnemonic, sub_ledger_type, is_balance_sheet_item, 
	sub_ledger_balance, ledger_code, version_id, status, reference_type, reference_oid, ledger_oid, institute_oid, created_by)
	VALUES(concat(v_eiin_oid, uuid()), 'CreditNote', v_teacher.name_en, v_teacher.name_bn, v_sub_ledger_code, v_teacher.name_en, v_credit_note_ledger.ledger_type, 
	v_credit_note_ledger.is_balance_sheet_item, 0, v_credit_note_ledger.ledger_code, v_credit_note_ledger.version_id, 'Active', 'Teacher', p_oid, 
	v_credit_note_ledger.oid, p_institute_oid, v_teacher.created_by);
        
        
        select case when count(*)+1 > 9 then concat(v_vendor_credit_ledger.ledger_code, (count(*)+1)) :: text 
        else concat(v_vendor_credit_ledger.ledger_code, '0', (count(*)+1)) :: text end INTO v_sub_ledger_code 
        from sub_ledger sl where sl.ledger_oid = v_vendor_credit_ledger.oid;
        
	INSERT INTO sub_ledger(oid, ledger_key, name_en, name_bn, sub_ledger_code, mnemonic, sub_ledger_type, is_balance_sheet_item, 
	sub_ledger_balance, ledger_code, version_id, status, reference_type, reference_oid, ledger_oid, institute_oid, created_by)
	VALUES(concat(v_eiin_oid, uuid()), 'VendorCredit', v_teacher.name_en, v_teacher.name_bn, v_sub_ledger_code, v_teacher.name_en, v_vendor_credit_ledger.ledger_type, 
	v_vendor_credit_ledger.is_balance_sheet_item, 0, v_vendor_credit_ledger.ledger_code, v_vendor_credit_ledger.version_id, 'Active', 'Teacher', p_oid, 
	v_vendor_credit_ledger.oid, p_institute_oid, v_teacher.created_by);
        
        
        select case when count(*)+1 > 9 then concat(v_salary_payable_ledger.ledger_code, (count(*)+1)) :: text 
        else concat(v_salary_payable_ledger.ledger_code, '0', (count(*)+1)) :: text end INTO v_sub_ledger_code 
        from sub_ledger sl where sl.ledger_oid = v_salary_payable_ledger.oid;
        
	INSERT INTO sub_ledger(oid, ledger_key, name_en, name_bn, sub_ledger_code, mnemonic, sub_ledger_type, is_balance_sheet_item, 
	sub_ledger_balance, ledger_code, version_id, status, reference_type, reference_oid, ledger_oid, institute_oid, created_by)
	VALUES(concat(v_eiin_oid, uuid()), 'SalaryPayable', v_teacher.name_en, v_teacher.name_bn, v_sub_ledger_code, v_teacher.name_en, v_salary_payable_ledger.ledger_type, 
	v_salary_payable_ledger.is_balance_sheet_item, 0, v_salary_payable_ledger.ledger_code, v_salary_payable_ledger.version_id, 'Active', 'Teacher', p_oid, 
	v_salary_payable_ledger.oid, p_institute_oid, v_teacher.created_by);
	
	
        IF coalesce(v_teacher.accounts_receivable::float, 0) > 0 THEN    
            
        	SELECT concat(v_eiin_oid, '-Jou-Sum-', uuid()) INTO v_journal_summary_oid;
	        SELECT * INTO v_sub_ledger FROM sub_ledger WHERE institute_oid = p_institute_oid and reference_oid = p_oid and ledger_key = 'AccountReceivable';
        	
		INSERT INTO journal_summary(oid, journal_entry_date, journal_type, journal_manner, amount, reference_no, version_id, remarks, status, 
		financial_period_oid, institute_oid, created_by) VALUES(v_journal_summary_oid, now(), 'AccountReceivable', 'Auto', v_teacher.accounts_receivable, 
		v_teacher.teacher_id, '1', 'Teacher Previous Account Receivable Adjustment', 'Active', v_financial_period.oid, p_institute_oid, v_teacher.created_by);				
		
		INSERT INTO journal(oid, journal_entry_date, journal_entry_no, journal_type, reference_no, remarks, debited_amount, credited_amount, ledger_oid, ledger_code, ledger_balance, 
		sub_ledger_oid, sub_ledger_code, sub_ledger_balance, reference_type, reference_oid, version_id, status, journal_summary_oid, financial_period_oid, institute_oid, created_by) 
		VALUES(concat(v_eiin_oid, '-Jounal-', uuid()), now(), 1, 'AccountReceivable', v_teacher.teacher_id, 'Teacher Previous Account Receivable', 
		v_teacher.accounts_receivable, 0, v_account_receivable_ledger.oid, v_account_receivable_ledger.ledger_code, (select ledger_balance from ledger where oid = v_account_receivable_ledger.oid), 
		v_sub_ledger.oid, v_sub_ledger.sub_ledger_code, v_sub_ledger.sub_ledger_balance, 'Teacher', p_oid, '1', 'Active', v_journal_summary_oid, v_financial_period.oid, 
		p_institute_oid, v_teacher.created_by);
		
		UPDATE ledger set ledger_balance = (ledger_balance + v_teacher.accounts_receivable) where oid = v_account_receivable_ledger.oid;	
		UPDATE sub_ledger set sub_ledger_balance = (sub_ledger_balance + v_teacher.accounts_receivable) where oid = v_sub_ledger.oid;
		
        	SELECT * INTO v_adjustment_receivable_ledger FROM ledger WHERE oid = (SELECT ledger_oid FROM ledger_setting WHERE institute_oid = p_institute_oid and ledger_key = 'AdjustmentReceivable');
        	
		INSERT INTO journal(oid, journal_entry_date, journal_entry_no, journal_type, reference_no, remarks, debited_amount, credited_amount, ledger_oid, ledger_code, ledger_balance, 
		sub_ledger_oid, sub_ledger_code, sub_ledger_balance, reference_type, reference_oid, version_id, status, journal_summary_oid, financial_period_oid, institute_oid, created_by) 
		VALUES(concat(v_eiin_oid, '-Jounal-', uuid()), now(), 2, 'AdjustmentReceivable', v_teacher.teacher_id, 'Adjustment Accounts Receivable', 
		0, v_teacher.accounts_receivable, v_adjustment_receivable_ledger.oid,v_adjustment_receivable_ledger.ledger_code, 
		(select ledger_balance from ledger where oid = v_adjustment_receivable_ledger.oid), null, null, null, 
		'Teacher', p_oid, '1', 'Active', v_journal_summary_oid, v_financial_period.oid, p_institute_oid, v_teacher.created_by);
		
		UPDATE ledger set ledger_balance = (ledger_balance + v_teacher.accounts_receivable) where oid = v_adjustment_receivable_ledger.oid;        				
        END IF;
        
	
        IF coalesce(v_teacher.accounts_payable::float, 0) > 0 THEN    
            
        	SELECT concat(v_eiin_oid, '-Jou-Sum-', uuid()) INTO v_journal_summary_oid;
	        SELECT * INTO v_sub_ledger FROM sub_ledger WHERE institute_oid = p_institute_oid and reference_oid = p_oid and ledger_key = 'AccountPayable';
        	
		INSERT INTO journal_summary(oid, journal_entry_date, journal_type, journal_manner, amount, reference_no, version_id, remarks, status, 
		financial_period_oid, institute_oid, created_by) VALUES(v_journal_summary_oid, now(), 'AccountPayable', 'Auto', v_teacher.accounts_payable, 
		v_teacher.teacher_id, '1', 'Teacher Previous Account Payable Adjustment', 'Active', v_financial_period.oid, p_institute_oid, v_teacher.created_by);				
		
		INSERT INTO journal(oid, journal_entry_date, journal_entry_no, journal_type, reference_no, remarks, debited_amount, credited_amount, ledger_oid, ledger_code, ledger_balance, 
		sub_ledger_oid, sub_ledger_code, sub_ledger_balance, reference_type, reference_oid, version_id, status, journal_summary_oid, financial_period_oid, institute_oid, created_by) 
		VALUES(concat(v_eiin_oid, '-Jounal-', uuid()), now(), 1, 'AccountPayable', v_teacher.teacher_id, 'Teacher Previous Account Payable', 
		0, v_teacher.accounts_payable,v_account_payable_ledger.oid, v_account_payable_ledger.ledger_code, v_account_payable_ledger.ledger_balance, 
		v_sub_ledger.oid, v_sub_ledger.sub_ledger_code, v_sub_ledger.sub_ledger_balance, 'Teacher', p_oid, '1', 'Active', v_journal_summary_oid, v_financial_period.oid, 
		p_institute_oid, v_teacher.created_by);
		
		UPDATE ledger set ledger_balance = (ledger_balance + v_teacher.accounts_payable) where oid = v_account_payable_ledger.oid;	
		UPDATE sub_ledger set sub_ledger_balance = (sub_ledger_balance + v_teacher.accounts_payable) where oid = v_sub_ledger.oid;
		
        	SELECT * INTO v_adjustment_payable_ledger FROM ledger WHERE oid = (SELECT ledger_oid FROM ledger_setting WHERE institute_oid = p_institute_oid and ledger_key = 'AdjustmentPayable');
        	
		INSERT INTO journal(oid, journal_entry_date, journal_entry_no, journal_type, reference_no, remarks, debited_amount, credited_amount, ledger_oid, ledger_code, ledger_balance, 
		sub_ledger_oid, sub_ledger_code, sub_ledger_balance, reference_type, reference_oid, version_id, status, journal_summary_oid, financial_period_oid, institute_oid, created_by) 
		VALUES(concat(v_eiin_oid, '-Jounal-', uuid()), now(), 2, 'AdjustmentPayable', v_teacher.teacher_id, 'Adjustment Accounts Payable', 
		v_teacher.accounts_payable, 0, v_adjustment_payable_ledger.oid, v_adjustment_payable_ledger.ledger_code, 
		(select ledger_balance from ledger where oid = v_adjustment_payable_ledger.oid), null, null, null, 
		'Teacher', p_oid, '1', 'Active', v_journal_summary_oid, v_financial_period.oid, p_institute_oid, v_teacher.created_by);
		
		UPDATE ledger set ledger_balance = (ledger_balance + v_teacher.accounts_payable) where oid = v_adjustment_payable_ledger.oid;        				
        END IF;
        
        IF coalesce(v_teacher.vendor_credit::float, 0) > 0 THEN    
            
        	SELECT concat(v_eiin_oid, '-Jou-Sum-', uuid()) INTO v_journal_summary_oid;
	        SELECT * INTO v_sub_ledger FROM sub_ledger WHERE institute_oid = p_institute_oid and reference_oid = p_oid and ledger_key = 'VendorCredit';
        	
		INSERT INTO journal_summary(oid, journal_entry_date, journal_type, journal_manner, amount, reference_no, version_id, remarks, status, 
		financial_period_oid, institute_oid, created_by) VALUES(v_journal_summary_oid, now(), 'VendorCredit', 'Auto', v_teacher.vendor_credit, 
		v_teacher.teacher_id, '1', 'Teacher Previous Vendor Credit (Advance Payment)', 'Active', v_financial_period.oid, p_institute_oid, v_teacher.created_by);				
		
		INSERT INTO journal(oid, journal_entry_date, journal_entry_no, journal_type, reference_no, remarks, debited_amount, credited_amount, ledger_oid, ledger_code, ledger_balance, 
		sub_ledger_oid, sub_ledger_code, sub_ledger_balance, reference_type, reference_oid, version_id, status, journal_summary_oid, financial_period_oid, institute_oid, created_by) 
		VALUES(concat(v_eiin_oid, '-Jounal-', uuid()), now(), 1, 'VendorCredit', v_teacher.teacher_id, 'Teacher Previous Vendor Credit (Advance Payment)', 
		v_teacher.vendor_credit, 0, v_vendor_credit_ledger.oid, v_vendor_credit_ledger.ledger_code, (select ledger_balance from ledger where oid = v_vendor_credit_ledger.oid), 
		v_sub_ledger.oid, v_sub_ledger.sub_ledger_code, v_sub_ledger.sub_ledger_balance, 'Teacher', p_oid, '1', 'Active', v_journal_summary_oid, v_financial_period.oid, 
		p_institute_oid, v_teacher.created_by);
		
		UPDATE ledger set ledger_balance = (ledger_balance + v_teacher.vendor_credit) where oid = v_vendor_credit_ledger.oid;	
		UPDATE sub_ledger set sub_ledger_balance = (sub_ledger_balance + v_teacher.vendor_credit) where oid = v_sub_ledger.oid;
		
        	SELECT * INTO v_adjustment_vendor_credit_ledger FROM ledger WHERE oid = (SELECT ledger_oid FROM ledger_setting 
        	WHERE institute_oid = p_institute_oid and ledger_key = 'AdjustmentVendorCredit');
        	
		INSERT INTO journal(oid, journal_entry_date, journal_entry_no, journal_type, reference_no, remarks, debited_amount, credited_amount, ledger_oid, ledger_code, ledger_balance, 
		sub_ledger_oid, sub_ledger_code, sub_ledger_balance, reference_type, reference_oid, version_id, status, journal_summary_oid, financial_period_oid, institute_oid, created_by) 
		VALUES(concat(v_eiin_oid, '-Jounal-', uuid()), now(), 2, 'AdjustmentVendorCredit', v_teacher.teacher_id, 'Adjustment Vendor Credit', 
		0, v_teacher.vendor_credit, v_adjustment_vendor_credit_ledger.oid,v_adjustment_vendor_credit_ledger.ledger_code, 
		(select ledger_balance from ledger where oid = v_adjustment_vendor_credit_ledger.oid), null, null, null, 
		'Teacher', p_oid, '1', 'Active', v_journal_summary_oid, v_financial_period.oid, p_institute_oid, v_teacher.created_by);
		
		UPDATE ledger set ledger_balance = (ledger_balance + v_teacher.vendor_credit) where oid = v_adjustment_vendor_credit_ledger.oid;        				
        END IF;
        
	
        IF coalesce(v_teacher.credit_note::float, 0) > 0 THEN    
            
        	SELECT concat(v_eiin_oid, '-Jou-Sum-', uuid()) INTO v_journal_summary_oid;
	        SELECT * INTO v_sub_ledger FROM sub_ledger WHERE institute_oid = p_institute_oid and reference_oid = p_oid and ledger_key = 'CreditNote';
        	
		INSERT INTO journal_summary(oid, journal_entry_date, journal_type, journal_manner, amount, reference_no, version_id, remarks, status, 
		financial_period_oid, institute_oid, created_by) VALUES(v_journal_summary_oid, now(), 'CreditNote', 'Auto', v_teacher.credit_note, v_teacher.teacher_id, 
		'1', 'Teacher Previous Credit Note (Advance Received) Adjustment', 'Active', v_financial_period.oid, p_institute_oid, v_teacher.created_by);				
		
		INSERT INTO journal(oid, journal_entry_date, journal_entry_no, journal_type, reference_no, remarks, debited_amount, credited_amount, ledger_oid, ledger_code, ledger_balance, 
		sub_ledger_oid, sub_ledger_code, sub_ledger_balance, reference_type, reference_oid, version_id, status, journal_summary_oid, financial_period_oid, institute_oid, created_by) 
		VALUES(concat(v_eiin_oid, '-Jounal-', uuid()), now(), 1, 'CreditNote', v_teacher.teacher_id, 'Teacher Previous Account Payable', 
		0, v_teacher.credit_note,v_credit_note_ledger.oid, v_credit_note_ledger.ledger_code, v_credit_note_ledger.ledger_balance, 
		v_sub_ledger.oid, v_sub_ledger.sub_ledger_code, v_sub_ledger.sub_ledger_balance, 'Teacher', p_oid, '1', 'Active', v_journal_summary_oid, v_financial_period.oid, 
		p_institute_oid, v_teacher.created_by);
		
		UPDATE ledger set ledger_balance = (ledger_balance + v_teacher.credit_note) where oid = v_credit_note_ledger.oid;	
		UPDATE sub_ledger set sub_ledger_balance = (sub_ledger_balance + v_teacher.credit_note) where oid = v_sub_ledger.oid;
		
        	SELECT * INTO v_adjustment_credit_note_ledger FROM ledger WHERE oid = (SELECT ledger_oid FROM ledger_setting WHERE institute_oid = p_institute_oid and ledger_key = 'AdjustmentCreditNote');
        	
		INSERT INTO journal(oid, journal_entry_date, journal_entry_no, journal_type, reference_no, remarks, debited_amount, credited_amount, ledger_oid, ledger_code, ledger_balance, 
		sub_ledger_oid, sub_ledger_code, sub_ledger_balance, reference_type, reference_oid, version_id, status, journal_summary_oid, financial_period_oid, institute_oid, created_by) 
		VALUES(concat(v_eiin_oid, '-Jounal-', uuid()), now(), 2, 'AdjustmentCreditNote', v_teacher.Teacher_id, 'Adjustment Credit Note', 
		v_teacher.credit_note, 0, v_adjustment_credit_note_ledger.oid, v_adjustment_credit_note_ledger.ledger_code, 
		(select ledger_balance from ledger where oid = v_adjustment_credit_note_ledger.oid), null, null, null, 
		'Teacher', p_oid, '1', 'Active', v_journal_summary_oid, v_financial_period.oid, p_institute_oid, v_teacher.created_by);
		
		UPDATE ledger set ledger_balance = (ledger_balance + v_teacher.credit_note) where oid = v_adjustment_credit_note_ledger.oid;        				
        END IF;
        
        IF coalesce(v_teacher.salary_payable::float, 0) > 0 THEN    
            
        	SELECT concat(v_eiin_oid, '-Jou-Sum-', uuid()) INTO v_journal_summary_oid;
	        SELECT * INTO v_sub_ledger FROM sub_ledger WHERE institute_oid = p_institute_oid and reference_oid = p_oid and ledger_key = 'SalaryPayable';
        	
		INSERT INTO journal_summary(oid, journal_entry_date, journal_type, journal_manner, amount, reference_no, version_id, remarks, status, 
		financial_period_oid, institute_oid, created_by) VALUES(v_journal_summary_oid, now(), 'SalaryPayable', 'Auto', v_teacher.salary_payable, 
		v_teacher.teacher_id, '1', 'Teacher Previous Salary Payable Adjustment', 'Active', v_financial_period.oid, p_institute_oid, v_teacher.created_by);				
		
		INSERT INTO journal(oid, journal_entry_date, journal_entry_no, journal_type, reference_no, remarks, debited_amount, credited_amount, ledger_oid, ledger_code, ledger_balance, 
		sub_ledger_oid, sub_ledger_code, sub_ledger_balance, reference_type, reference_oid, version_id, status, journal_summary_oid, financial_period_oid, institute_oid, created_by) 
		VALUES(concat(v_eiin_oid, '-Jounal-', uuid()), now(), 1, 'SalaryPayable', v_teacher.teacher_id, 'Teacher Previous Salary Payable', 
		0, v_teacher.salary_payable,v_salary_payable_ledger.oid, v_salary_payable_ledger.ledger_code, (select ledger_balance from ledger where oid = v_salary_payable_ledger.oid), 
		v_sub_ledger.oid, v_sub_ledger.sub_ledger_code, v_sub_ledger.sub_ledger_balance, 'Teacher', p_oid, '1', 'Active', v_journal_summary_oid, v_financial_period.oid, 
		p_institute_oid, v_teacher.created_by);
		
		UPDATE ledger set ledger_balance = (ledger_balance + v_teacher.salary_payable) where oid = v_salary_payable_ledger.oid;	
		UPDATE sub_ledger set sub_ledger_balance = (sub_ledger_balance + v_teacher.salary_payable) where oid = v_sub_ledger.oid;
		
        	SELECT * INTO v_adjustment_salary_payable_ledger FROM ledger WHERE oid = (SELECT ledger_oid FROM ledger_setting WHERE institute_oid = p_institute_oid 
        	and ledger_key = 'AdjustmentSalaryPayable');
        	
		INSERT INTO journal(oid, journal_entry_date, journal_entry_no, journal_type, reference_no, remarks, debited_amount, credited_amount, ledger_oid, ledger_code, ledger_balance, 
		sub_ledger_oid, sub_ledger_code, sub_ledger_balance, reference_type, reference_oid, version_id, status, journal_summary_oid, financial_period_oid, institute_oid, created_by) 
		VALUES(concat(v_eiin_oid, '-Jounal-', uuid()), now(), 2, 'AdjustmentSalaryPayable', v_teacher.teacher_id, 'Adjustment Salary Payable Amount', 
		v_teacher.salary_payable, 0, v_adjustment_salary_payable_ledger.oid, v_adjustment_salary_payable_ledger.ledger_code, 
		(select ledger_balance from ledger where oid = v_adjustment_salary_payable_ledger.oid), null, null, null, 
		'Teacher', p_oid, '1', 'Active', v_journal_summary_oid, v_financial_period.oid, p_institute_oid, v_teacher.created_by);
		
		UPDATE ledger set ledger_balance = (ledger_balance + v_teacher.salary_payable) where oid = v_adjustment_salary_payable_ledger.oid;        				
        END IF;
	
    END;
$create_teacher_sub_ledger$ LANGUAGE plpgsql;
-- SELECT create_teacher_sub_ledger('10', '10');


--DROP FUNCTION IF EXISTS create_people_sub_ledger(varchar(128));
CREATE OR REPLACE FUNCTION create_people_sub_ledger(p_oid varchar(128), p_institute_oid varchar(128))
RETURNS void AS $create_people_sub_ledger$
    DECLARE
    	v_institute				record;	
    	v_people				record;
    	v_account_receivable_ledger_setting	record;
    	v_account_payable_ledger_setting	record;	
    	v_credit_note_ledger_setting		record;
    	v_vendor_credit_ledger_setting		record;
    	v_account_receivable_ledger		record;
    	v_account_payable_ledger		record;	
    	v_credit_note_ledger			record;
    	v_vendor_credit_ledger			record;
    	v_adjustment_receivable_ledger		record;
    	v_adjustment_payable_ledger		record;
    	v_adjustment_credit_note_ledger		record;
    	v_adjustment_vendor_credit_ledger	record;
    	v_financial_period			record;
    	v_sub_ledger				record;
        v_timestamp                     	varchar(128);
    	v_sub_ledger_code			varchar(128);
        v_eiin_oid            			varchar(64);
        v_journal_summary_oid                  	varchar(128);
        
    	
    BEGIN
    
        SELECT to_char(clock_timestamp(), 'YYYYMMDDHH24MISSMS') INTO v_timestamp;
        SELECT * INTO v_people FROM people WHERE oid = p_oid;
        SELECT * INTO v_institute FROM institute WHERE oid = p_institute_oid;
        SELECT * INTO v_financial_period FROM financial_period WHERE institute_oid = p_institute_oid and status = 'Opened';
        
        SELECT concat('SCHOOL-ERP-', v_institute.eiin_number, '-Sub-LGR-') INTO v_eiin_oid;
        
        SELECT * INTO v_account_receivable_ledger_setting FROM ledger_setting WHERE institute_oid = p_institute_oid and ledger_key = 'AccountReceivable';
        SELECT * INTO v_account_payable_ledger_setting FROM ledger_setting WHERE institute_oid = p_institute_oid and ledger_key = 'AccountPayable';
        SELECT * INTO v_credit_note_ledger_setting FROM ledger_setting WHERE institute_oid = p_institute_oid and ledger_key = 'CreditNote';     
        SELECT * INTO v_vendor_credit_ledger_setting FROM ledger_setting WHERE institute_oid = p_institute_oid and ledger_key = 'VendorCredit';
         
        SELECT * INTO v_account_receivable_ledger FROM ledger WHERE institute_oid = p_institute_oid and oid = v_account_receivable_ledger_setting.ledger_oid;
        SELECT * INTO v_account_payable_ledger FROM ledger WHERE institute_oid = p_institute_oid and oid = v_account_payable_ledger_setting.ledger_oid;
        SELECT * INTO v_credit_note_ledger FROM ledger WHERE institute_oid = p_institute_oid and oid = v_credit_note_ledger_setting.ledger_oid;
        SELECT * INTO v_vendor_credit_ledger FROM ledger WHERE institute_oid = p_institute_oid and oid = v_vendor_credit_ledger_setting.ledger_oid;
        
        
        select case when count(*)+1 > 9 then concat(v_account_receivable_ledger.ledger_code, (count(*)+1)) :: text 
        else concat(v_account_receivable_ledger.ledger_code, '0', (count(*)+1)) :: text end INTO v_sub_ledger_code 
        from sub_ledger sl where sl.ledger_oid = v_account_receivable_ledger.oid;
        
	INSERT INTO sub_ledger(oid, ledger_key, name_en, name_bn, sub_ledger_code, mnemonic, sub_ledger_type, is_balance_sheet_item, 
	sub_ledger_balance, ledger_code, version_id, status, reference_type, reference_oid, ledger_oid, institute_oid, created_by)
	VALUES(concat(v_eiin_oid, uuid()), 'AccountReceivable', v_people.name_en, v_people.name_bn, v_sub_ledger_code, v_people.name_en, v_account_receivable_ledger.ledger_type, 
	v_account_receivable_ledger.is_balance_sheet_item, 0, v_account_receivable_ledger.ledger_code, v_account_receivable_ledger.version_id, 'Active', 'People', p_oid, 
	v_account_receivable_ledger.oid, p_institute_oid, v_people.created_by);
        
        
        select case when count(*)+1 > 9 then concat(v_account_payable_ledger.ledger_code, (count(*)+1)) :: text 
        else concat(v_account_payable_ledger.ledger_code, '0', (count(*)+1)) :: text end INTO v_sub_ledger_code 
        from sub_ledger sl where sl.ledger_oid = v_account_payable_ledger.oid;
        
	INSERT INTO sub_ledger(oid, ledger_key, name_en, name_bn, sub_ledger_code, mnemonic, sub_ledger_type, is_balance_sheet_item, 
	sub_ledger_balance, ledger_code, version_id, status, reference_type, reference_oid, ledger_oid, institute_oid, created_by)
	VALUES(concat(v_eiin_oid, uuid()), 'AccountPayable', v_people.name_en, v_people.name_bn, v_sub_ledger_code, v_people.name_en, v_account_payable_ledger.ledger_type, 
	v_account_payable_ledger.is_balance_sheet_item, 0, v_account_payable_ledger.ledger_code, v_account_payable_ledger.version_id, 'Active', 'People', p_oid, 
	v_account_payable_ledger.oid, p_institute_oid, v_people.created_by);
        
        
        select case when count(*)+1 > 9 then concat(v_credit_note_ledger.ledger_code, (count(*)+1)) :: text 
        else concat(v_credit_note_ledger.ledger_code, '0', (count(*)+1)) :: text end INTO v_sub_ledger_code 
        from sub_ledger sl where sl.ledger_oid = v_credit_note_ledger.oid;
        
	INSERT INTO sub_ledger(oid, ledger_key, name_en, name_bn, sub_ledger_code, mnemonic, sub_ledger_type, is_balance_sheet_item, 
	sub_ledger_balance, ledger_code, version_id, status, reference_type, reference_oid, ledger_oid, institute_oid, created_by)
	VALUES(concat(v_eiin_oid, uuid()), 'CreditNote', v_people.name_en, v_people.name_bn, v_sub_ledger_code, v_people.name_en, v_credit_note_ledger.ledger_type, 
	v_credit_note_ledger.is_balance_sheet_item, 0, v_credit_note_ledger.ledger_code, v_credit_note_ledger.version_id, 'Active', 'People', p_oid, 
	v_credit_note_ledger.oid, p_institute_oid, v_people.created_by);
        
        
        select case when count(*)+1 > 9 then concat(v_vendor_credit_ledger.ledger_code, (count(*)+1)) :: text 
        else concat(v_vendor_credit_ledger.ledger_code, '0', (count(*)+1)) :: text end INTO v_sub_ledger_code 
        from sub_ledger sl where sl.ledger_oid = v_vendor_credit_ledger.oid;
        
	INSERT INTO sub_ledger(oid, ledger_key, name_en, name_bn, sub_ledger_code, mnemonic, sub_ledger_type, is_balance_sheet_item, 
	sub_ledger_balance, ledger_code, version_id, status, reference_type, reference_oid, ledger_oid, institute_oid, created_by)
	VALUES(concat(v_eiin_oid, uuid()), 'VendorCredit', v_people.name_en, v_people.name_bn, v_sub_ledger_code, v_people.name_en, v_vendor_credit_ledger.ledger_type, 
	v_vendor_credit_ledger.is_balance_sheet_item, 0, v_vendor_credit_ledger.ledger_code, v_vendor_credit_ledger.version_id, 'Active', 'People', p_oid, 
	v_vendor_credit_ledger.oid, p_institute_oid, v_people.created_by);
	
	
        IF coalesce(v_people.accounts_receivable::float, 0) > 0 THEN    
            
        	SELECT concat(v_eiin_oid, '-Jou-Sum-', uuid()) INTO v_journal_summary_oid;
	        SELECT * INTO v_sub_ledger FROM sub_ledger WHERE institute_oid = p_institute_oid and reference_oid = p_oid and ledger_key = 'AccountReceivable';
        	
		INSERT INTO journal_summary(oid, journal_entry_date, journal_type, journal_manner, amount, reference_no, version_id, remarks, status, 
		financial_period_oid, institute_oid, created_by) VALUES(v_journal_summary_oid, now(), 'AccountReceivable', 'Auto', v_people.accounts_receivable, 
		v_people.people_id, '1', 'People Previous Account Receivable Adjustment', 'Active', v_financial_period.oid, p_institute_oid, v_people.created_by);				
		
		INSERT INTO journal(oid, journal_entry_date, journal_entry_no, journal_type, reference_no, remarks, debited_amount, credited_amount, ledger_oid, ledger_code, ledger_balance, 
		sub_ledger_oid, sub_ledger_code, sub_ledger_balance, reference_type, reference_oid, version_id, status, journal_summary_oid, financial_period_oid, institute_oid, created_by) 
		VALUES(concat(v_eiin_oid, '-Jounal-', uuid()), now(), 1, 'AccountReceivable', v_people.people_id, 'People Previous Account Receivable', 
		v_people.accounts_receivable, 0, v_account_receivable_ledger.oid, v_account_receivable_ledger.ledger_code, (select ledger_balance from ledger where oid = v_account_receivable_ledger.oid), 
		v_sub_ledger.oid, v_sub_ledger.sub_ledger_code, v_sub_ledger.sub_ledger_balance, 'People', p_oid, '1', 'Active', v_journal_summary_oid, v_financial_period.oid, 
		p_institute_oid, v_people.created_by);
		
		UPDATE ledger set ledger_balance = (ledger_balance + v_people.accounts_receivable) where oid = v_account_receivable_ledger.oid;	
		UPDATE sub_ledger set sub_ledger_balance = (sub_ledger_balance + v_people.accounts_receivable) where oid = v_sub_ledger.oid;
		
        	SELECT * INTO v_adjustment_receivable_ledger FROM ledger WHERE oid = (SELECT ledger_oid FROM ledger_setting WHERE institute_oid = p_institute_oid and ledger_key = 'AdjustmentReceivable');
        	
		INSERT INTO journal(oid, journal_entry_date, journal_entry_no, journal_type, reference_no, remarks, debited_amount, credited_amount, ledger_oid, ledger_code, ledger_balance, 
		sub_ledger_oid, sub_ledger_code, sub_ledger_balance, reference_type, reference_oid, version_id, status, journal_summary_oid, financial_period_oid, institute_oid, created_by) 
		VALUES(concat(v_eiin_oid, '-Jounal-', uuid()), now(), 2, 'AdjustmentReceivable', v_people.people_id, 'Adjustment Accounts Receivable', 
		0, v_people.accounts_receivable, v_adjustment_receivable_ledger.oid,v_adjustment_receivable_ledger.ledger_code, 
		(select ledger_balance from ledger where oid = v_adjustment_receivable_ledger.oid), null, null, null, 
		'People', p_oid, '1', 'Active', v_journal_summary_oid, v_financial_period.oid, p_institute_oid, v_people.created_by);
		
		UPDATE ledger set ledger_balance = (ledger_balance + v_people.accounts_receivable) where oid = v_adjustment_receivable_ledger.oid;        				
        END IF;
        
	
        IF coalesce(v_people.accounts_payable::float, 0) > 0 THEN    
            
        	SELECT concat(v_eiin_oid, '-Jou-Sum-', uuid()) INTO v_journal_summary_oid;
	        SELECT * INTO v_sub_ledger FROM sub_ledger WHERE institute_oid = p_institute_oid and reference_oid = p_oid and ledger_key = 'AccountPayable';
        	
		INSERT INTO journal_summary(oid, journal_entry_date, journal_type, journal_manner, amount, reference_no, version_id, remarks, status, 
		financial_period_oid, institute_oid, created_by) VALUES(v_journal_summary_oid, now(), 'AccountPayable', 'Auto', v_people.accounts_payable, 
		v_people.people_id, '1', 'People Previous Account Payable Adjustment', 'Active', v_financial_period.oid, p_institute_oid, v_people.created_by);				
		
		INSERT INTO journal(oid, journal_entry_date, journal_entry_no, journal_type, reference_no, remarks, debited_amount, credited_amount, ledger_oid, ledger_code, ledger_balance, 
		sub_ledger_oid, sub_ledger_code, sub_ledger_balance, reference_type, reference_oid, version_id, status, journal_summary_oid, financial_period_oid, institute_oid, created_by) 
		VALUES(concat(v_eiin_oid, '-Jounal-', uuid()), now(), 1, 'AccountPayable', v_people.people_id, 'People Previous Account Payable', 
		0, v_people.accounts_payable,v_account_payable_ledger.oid, v_account_payable_ledger.ledger_code, v_account_payable_ledger.ledger_balance, 
		v_sub_ledger.oid, v_sub_ledger.sub_ledger_code, v_sub_ledger.sub_ledger_balance, 'People', p_oid, '1', 'Active', v_journal_summary_oid, v_financial_period.oid, 
		p_institute_oid, v_people.created_by);
		
		UPDATE ledger set ledger_balance = (ledger_balance + v_people.accounts_payable) where oid = v_account_payable_ledger.oid;	
		UPDATE sub_ledger set sub_ledger_balance = (sub_ledger_balance + v_people.accounts_payable) where oid = v_sub_ledger.oid;
		
        	SELECT * INTO v_adjustment_payable_ledger FROM ledger WHERE oid = (SELECT ledger_oid FROM ledger_setting WHERE institute_oid = p_institute_oid and ledger_key = 'AdjustmentPayable');
        	
		INSERT INTO journal(oid, journal_entry_date, journal_entry_no, journal_type, reference_no, remarks, debited_amount, credited_amount, ledger_oid, ledger_code, ledger_balance, 
		sub_ledger_oid, sub_ledger_code, sub_ledger_balance, reference_type, reference_oid, version_id, status, journal_summary_oid, financial_period_oid, institute_oid, created_by) 
		VALUES(concat(v_eiin_oid, '-Jounal-', uuid()), now(), 2, 'AdjustmentPayable', v_people.people_id, 'Adjustment Accounts Payable', 
		v_people.accounts_payable, 0, v_adjustment_payable_ledger.oid, v_adjustment_payable_ledger.ledger_code, 
		(select ledger_balance from ledger where oid = v_adjustment_payable_ledger.oid), null, null, null, 
		'People', p_oid, '1', 'Active', v_journal_summary_oid, v_financial_period.oid, p_institute_oid, v_people.created_by);
		
		UPDATE ledger set ledger_balance = (ledger_balance + v_people.accounts_payable) where oid = v_adjustment_payable_ledger.oid;        				
        END IF;
        
        IF coalesce(v_people.vendor_credit::float, 0) > 0 THEN    
            
        	SELECT concat(v_eiin_oid, '-Jou-Sum-', uuid()) INTO v_journal_summary_oid;
	        SELECT * INTO v_sub_ledger FROM sub_ledger WHERE institute_oid = p_institute_oid and reference_oid = p_oid and ledger_key = 'VendorCredit';
        	
		INSERT INTO journal_summary(oid, journal_entry_date, journal_type, journal_manner, amount, reference_no, version_id, remarks, status, 
		financial_period_oid, institute_oid, created_by) VALUES(v_journal_summary_oid, now(), 'VendorCredit', 'Auto', v_people.vendor_credit, 
		v_people.people_id, '1', 'People Previous Vendor Credit (Advance Payment)', 'Active', v_financial_period.oid, p_institute_oid, v_people.created_by);				
		
		INSERT INTO journal(oid, journal_entry_date, journal_entry_no, journal_type, reference_no, remarks, debited_amount, credited_amount, ledger_oid, ledger_code, ledger_balance, 
		sub_ledger_oid, sub_ledger_code, sub_ledger_balance, reference_type, reference_oid, version_id, status, journal_summary_oid, financial_period_oid, institute_oid, created_by) 
		VALUES(concat(v_eiin_oid, '-Jounal-', uuid()), now(), 1, 'VendorCredit', v_people.people_id, 'People Previous Vendor Credit (Advance Payment)', 
		v_people.vendor_credit, 0, v_vendor_credit_ledger.oid, v_vendor_credit_ledger.ledger_code, (select ledger_balance from ledger where oid = v_vendor_credit_ledger.oid), 
		v_sub_ledger.oid, v_sub_ledger.sub_ledger_code, v_sub_ledger.sub_ledger_balance, 'People', p_oid, '1', 'Active', v_journal_summary_oid, v_financial_period.oid, 
		p_institute_oid, v_people.created_by);
		
		UPDATE ledger set ledger_balance = (ledger_balance + v_people.vendor_credit) where oid = v_vendor_credit_ledger.oid;	
		UPDATE sub_ledger set sub_ledger_balance = (sub_ledger_balance + v_people.vendor_credit) where oid = v_sub_ledger.oid;
		
        	SELECT * INTO v_adjustment_vendor_credit_ledger FROM ledger WHERE oid = (SELECT ledger_oid FROM ledger_setting 
        	WHERE institute_oid = p_institute_oid and ledger_key = 'AdjustmentVendorCredit');
        	
		INSERT INTO journal(oid, journal_entry_date, journal_entry_no, journal_type, reference_no, remarks, debited_amount, credited_amount, ledger_oid, ledger_code, ledger_balance, 
		sub_ledger_oid, sub_ledger_code, sub_ledger_balance, reference_type, reference_oid, version_id, status, journal_summary_oid, financial_period_oid, institute_oid, created_by) 
		VALUES(concat(v_eiin_oid, '-Jounal-', uuid()), now(), 2, 'AdjustmentVendorCredit', v_people.people_id, 'Adjustment Vendor Credit', 
		0, v_people.vendor_credit, v_adjustment_vendor_credit_ledger.oid,v_adjustment_vendor_credit_ledger.ledger_code, 
		(select ledger_balance from ledger where oid = v_adjustment_vendor_credit_ledger.oid), null, null, null, 
		'People', p_oid, '1', 'Active', v_journal_summary_oid, v_financial_period.oid, p_institute_oid, v_people.created_by);
		
		UPDATE ledger set ledger_balance = (ledger_balance + v_people.vendor_credit) where oid = v_adjustment_vendor_credit_ledger.oid;        				
        END IF;
        
	
        IF coalesce(v_people.credit_note::float, 0) > 0 THEN    
            
        	SELECT concat(v_eiin_oid, '-Jou-Sum-', uuid()) INTO v_journal_summary_oid;
	        SELECT * INTO v_sub_ledger FROM sub_ledger WHERE institute_oid = p_institute_oid and reference_oid = p_oid and ledger_key = 'CreditNote';
        	
		INSERT INTO journal_summary(oid, journal_entry_date, journal_type, journal_manner, amount, reference_no, version_id, remarks, status, 
		financial_period_oid, institute_oid, created_by) VALUES(v_journal_summary_oid, now(), 'CreditNote', 'Auto', v_people.credit_note, 
		v_people.people_id, '1', 'People Previous Credit Note (Advance Received) Adjustment', 'Active', v_financial_period.oid, p_institute_oid, v_people.created_by);				
		
		INSERT INTO journal(oid, journal_entry_date, journal_entry_no, journal_type, reference_no, remarks, debited_amount, credited_amount, ledger_oid, ledger_code, ledger_balance, 
		sub_ledger_oid, sub_ledger_code, sub_ledger_balance, reference_type, reference_oid, version_id, status, journal_summary_oid, financial_period_oid, institute_oid, created_by) 
		VALUES(concat(v_eiin_oid, '-Jounal-', uuid()), now(), 1, 'CreditNote', v_people.people_id, 'People Previous Account Payable', 
		0, v_people.credit_note,v_credit_note_ledger.oid, v_credit_note_ledger.ledger_code, v_credit_note_ledger.ledger_balance, 
		v_sub_ledger.oid, v_sub_ledger.sub_ledger_code, v_sub_ledger.sub_ledger_balance, 'People', p_oid, '1', 'Active', v_journal_summary_oid, v_financial_period.oid, 
		p_institute_oid, v_people.created_by);
		
		UPDATE ledger set ledger_balance = (ledger_balance + v_people.credit_note) where oid = v_credit_note_ledger.oid;	
		UPDATE sub_ledger set sub_ledger_balance = (sub_ledger_balance + v_people.credit_note) where oid = v_sub_ledger.oid;
		
        	SELECT * INTO v_adjustment_credit_note_ledger FROM ledger WHERE oid = (SELECT ledger_oid FROM ledger_setting WHERE institute_oid = p_institute_oid and ledger_key = 'AdjustmentCreditNote');
        	
		INSERT INTO journal(oid, journal_entry_date, journal_entry_no, journal_type, reference_no, remarks, debited_amount, credited_amount, ledger_oid, ledger_code, ledger_balance, 
		sub_ledger_oid, sub_ledger_code, sub_ledger_balance, reference_type, reference_oid, version_id, status, journal_summary_oid, financial_period_oid, institute_oid, created_by) 
		VALUES(concat(v_eiin_oid, '-Jounal-', uuid()), now(), 2, 'AdjustmentCreditNote', v_people.people_id, 'Adjustment Credit Note', 
		v_people.credit_note, 0, v_adjustment_credit_note_ledger.oid, v_adjustment_credit_note_ledger.ledger_code, 
		(select ledger_balance from ledger where oid = v_adjustment_credit_note_ledger.oid), null, null, null, 
		'People', p_oid, '1', 'Active', v_journal_summary_oid, v_financial_period.oid, p_institute_oid, v_people.created_by);
		
		UPDATE ledger set ledger_balance = (ledger_balance + v_people.credit_note) where oid = v_adjustment_credit_note_ledger.oid;        				
        END IF;
	
    END;
$create_people_sub_ledger$ LANGUAGE plpgsql;
-- SELECT create_people_sub_ledger('10', '10');





--DROP FUNCTION IF EXISTS create_student_sub_ledger_by_institute(varchar(128));
CREATE OR REPLACE FUNCTION create_student_sub_ledger_by_institute(p_institute_oid varchar(128))
RETURNS void AS $create_student_sub_ledger_by_institute$
    DECLARE
    	v_institute				record;	
    	v_student				record;
    	v_academic_fee_ledger_setting		record;
    	v_academic_fine_ledger_setting		record;    	
    	v_academic_fee_ledger			record;
    	v_academic_fine_ledger			record;
        v_timestamp                     	varchar(128);
    	v_sub_ledger_code			varchar(128);
        v_eiin_oid            			varchar(64);
        debit                           	json;
        credit                          	json;
        journal_list                    	json;
        v_journal_summary               	json;    
        v_due_amount				numeric(10,0);	
        v_paid_amount				numeric(10,0); 	
    	v_academic_fee_sub_ledger_oid		varchar(128);
    	
    BEGIN
    
        SELECT to_char(clock_timestamp(), 'YYYYMMDDHH24MISSMS') INTO v_timestamp;
        SELECT * INTO v_institute FROM institute WHERE oid = p_institute_oid;
        SELECT concat('SCHOOL-ERP-', v_institute.eiin_number, '-Sub-LGR-') INTO v_eiin_oid;
        
        SELECT * INTO v_academic_fee_ledger_setting FROM ledger_setting WHERE institute_oid = p_institute_oid and ledger_key = 'AcademicFee';
        SELECT * INTO v_academic_fine_ledger_setting FROM ledger_setting WHERE institute_oid = p_institute_oid and ledger_key = 'AcademicFine';
        
        SELECT * INTO v_academic_fee_ledger FROM ledger WHERE institute_oid = p_institute_oid and oid = v_academic_fee_ledger_setting.ledger_oid;
        SELECT * INTO v_academic_fine_ledger FROM ledger WHERE institute_oid = p_institute_oid and oid = v_academic_fine_ledger_setting.ledger_oid;
        
        
    
        for v_student in (select * from student  where institute_oid = p_institute_oid) loop 
        
		SELECT concat(v_eiin_oid, uuid()) INTO v_academic_fee_sub_ledger_oid; 
        
		--SELECT sum(due_amount) INTO v_due_amount FROM due_fees WHERE institute_oid = p_institute_oid and student_oid = v_student.oid;
		--SELECT sum(paid_amount) INTO v_paid_amount FROM due_fees WHERE institute_oid = p_institute_oid and student_oid = v_student.oid;
		
		If (select count(oid) from sub_ledger where ledger_key = 'AcademicFee' and reference_oid = v_student.oid) = 0 THEN
		
			select case when count(*)+1 > 9 then concat(v_academic_fee_ledger.ledger_code, (count(*)+1)) :: text 
			else concat(v_academic_fee_ledger.ledger_code, '0', (count(*)+1)) :: text end INTO v_sub_ledger_code 
			from sub_ledger sl where sl.ledger_oid = v_academic_fee_ledger.oid;
			
			INSERT INTO sub_ledger(oid, ledger_key, name_en, name_bn, sub_ledger_code, mnemonic, sub_ledger_type, is_balance_sheet_item, 
			sub_ledger_balance, ledger_code, version_id, status, reference_type, reference_oid, ledger_oid, institute_oid, created_by)
			VALUES(v_academic_fee_sub_ledger_oid, 'AcademicFee', v_student.name_en, v_student.name_bn, v_sub_ledger_code, v_student.name_en, v_academic_fee_ledger.ledger_type, 
			v_academic_fee_ledger.is_balance_sheet_item, 0, v_academic_fee_ledger.ledger_code, v_academic_fee_ledger.version_id, 'Active', 'Student', v_student.oid, 
			v_academic_fee_ledger.oid, p_institute_oid, v_student.created_by);
		
		END IF;
		
		
		If (select count(oid) from sub_ledger where ledger_key = 'AcademicFine' and reference_oid = v_student.oid) = 0 THEN
		
			select case when count(*)+1 > 9 then concat(v_academic_fine_ledger.ledger_code, (count(*)+1)) :: text 
			else concat(v_academic_fine_ledger.ledger_code, '0', (count(*)+1)) :: text end INTO v_sub_ledger_code 
			from sub_ledger sl where sl.ledger_oid = v_academic_fine_ledger.oid;
			
			INSERT INTO sub_ledger(oid, ledger_key, name_en, name_bn, sub_ledger_code, mnemonic, sub_ledger_type, is_balance_sheet_item, 
			sub_ledger_balance, ledger_code, version_id, status, reference_type, reference_oid, ledger_oid, institute_oid, created_by)
			VALUES(concat(v_eiin_oid, uuid()), 'AcademicFine', v_student.name_en, v_student.name_bn, v_sub_ledger_code, v_student.name_en, v_academic_fine_ledger.ledger_type, 
			v_academic_fine_ledger.is_balance_sheet_item, 0, v_academic_fine_ledger.ledger_code, v_academic_fine_ledger.version_id, 'Active', 'Student', v_student.oid, 
			v_academic_fine_ledger.oid, p_institute_oid, v_student.created_by);
		
		END IF;
        
	end loop;
	
    END;
$create_student_sub_ledger_by_institute$ LANGUAGE plpgsql;
-- SELECT create_student_sub_ledger_by_institute('10', '10');

--DROP FUNCTION IF EXISTS create_people_sub_ledger(varchar(128));
CREATE OR REPLACE FUNCTION create_people_sub_ledger_by_institute(p_institute_oid varchar(128))
RETURNS void AS $create_people_sub_ledger_by_institute$
    DECLARE
    	v_institute				record;	
    	v_people				record;
    	v_account_receivable_ledger_setting	record;
    	v_account_payable_ledger_setting	record;	
    	v_credit_note_ledger_setting		record;
    	v_vendor_credit_ledger_setting		record;
    	v_account_receivable_ledger		record;
    	v_account_payable_ledger		record;	
    	v_credit_note_ledger			record;
    	v_vendor_credit_ledger			record;
    	v_adjustment_receivable_ledger		record;
    	v_adjustment_payable_ledger		record;
    	v_adjustment_credit_note_ledger		record;
    	v_adjustment_vendor_credit_ledger	record;
    	v_financial_period			record;
    	v_sub_ledger				record;
        v_timestamp                     	varchar(128);
    	v_sub_ledger_code			varchar(128);
        v_eiin_oid            			varchar(64);
        v_journal_summary_oid                  	varchar(128);
        
    	
    BEGIN
    
        SELECT to_char(clock_timestamp(), 'YYYYMMDDHH24MISSMS') INTO v_timestamp;
        SELECT * INTO v_institute FROM institute WHERE oid = p_institute_oid;
        SELECT * INTO v_financial_period FROM financial_period WHERE institute_oid = p_institute_oid and status = 'Opened';
        
        SELECT concat('SCHOOL-ERP-', v_institute.eiin_number, '-Sub-LGR-') INTO v_eiin_oid;
        
        SELECT * INTO v_account_receivable_ledger_setting FROM ledger_setting WHERE institute_oid = p_institute_oid and ledger_key = 'AccountReceivable';
        SELECT * INTO v_account_payable_ledger_setting FROM ledger_setting WHERE institute_oid = p_institute_oid and ledger_key = 'AccountPayable';
        SELECT * INTO v_credit_note_ledger_setting FROM ledger_setting WHERE institute_oid = p_institute_oid and ledger_key = 'CreditNote';     
        SELECT * INTO v_vendor_credit_ledger_setting FROM ledger_setting WHERE institute_oid = p_institute_oid and ledger_key = 'VendorCredit';
         
        SELECT * INTO v_account_receivable_ledger FROM ledger WHERE institute_oid = p_institute_oid and oid = v_account_receivable_ledger_setting.ledger_oid;
        SELECT * INTO v_account_payable_ledger FROM ledger WHERE institute_oid = p_institute_oid and oid = v_account_payable_ledger_setting.ledger_oid;
        SELECT * INTO v_credit_note_ledger FROM ledger WHERE institute_oid = p_institute_oid and oid = v_credit_note_ledger_setting.ledger_oid;
        SELECT * INTO v_vendor_credit_ledger FROM ledger WHERE institute_oid = p_institute_oid and oid = v_vendor_credit_ledger_setting.ledger_oid;
        
        
        FOR v_people in (select * from people  where institute_oid = p_institute_oid) LOOP 
        
        
	    If (select count(oid) from sub_ledger where ledger_key = 'AccountReceivable' and reference_oid = v_people.oid) = 0 THEN
        
		select case when count(*)+1 > 9 then concat(v_account_receivable_ledger.ledger_code, (count(*)+1)) :: text 
		else concat(v_account_receivable_ledger.ledger_code, '0', (count(*)+1)) :: text end INTO v_sub_ledger_code 
		from sub_ledger sl where sl.ledger_oid = v_account_receivable_ledger.oid;
		
		INSERT INTO sub_ledger(oid, ledger_key, name_en, name_bn, sub_ledger_code, mnemonic, sub_ledger_type, is_balance_sheet_item, 
		sub_ledger_balance, ledger_code, version_id, status, reference_type, reference_oid, ledger_oid, institute_oid, created_by)
		VALUES(concat(v_eiin_oid, uuid()), 'AccountReceivable', v_people.name_en, v_people.name_bn, v_sub_ledger_code, v_people.name_en, v_account_receivable_ledger.ledger_type, 
		v_account_receivable_ledger.is_balance_sheet_item, 0, v_account_receivable_ledger.ledger_code, v_account_receivable_ledger.version_id, 'Active', 'People', v_people.oid, 
		v_account_receivable_ledger.oid, p_institute_oid, v_people.created_by);
		
		IF coalesce(v_people.accounts_receivable::float, 0) > 0 THEN    
		    
			SELECT concat(v_eiin_oid, '-Jou-Sum-', uuid()) INTO v_journal_summary_oid;
			SELECT * INTO v_sub_ledger FROM sub_ledger WHERE institute_oid = p_institute_oid and reference_oid = v_people.oid and ledger_key = 'AccountReceivable';
			
			INSERT INTO journal_summary(oid, journal_entry_date, journal_type, journal_manner, amount, reference_no, version_id, remarks, status, 
			financial_period_oid, institute_oid, created_by) VALUES(v_journal_summary_oid, now(), 'AccountReceivable', 'Auto', v_people.accounts_receivable, 
			v_people.people_id, '1', 'People Previous Account Receivable Adjustment', 'Active', v_financial_period.oid, p_institute_oid, v_people.created_by);				
			
			INSERT INTO journal(oid, journal_entry_date, journal_entry_no, journal_type, reference_no, remarks, debited_amount, credited_amount, ledger_oid, ledger_code, ledger_balance, 
			sub_ledger_oid, sub_ledger_code, sub_ledger_balance, reference_type, reference_oid, version_id, status, journal_summary_oid, financial_period_oid, institute_oid, created_by) 
			VALUES(concat(v_eiin_oid, '-Jounal-', uuid()), now(), 1, 'AccountReceivable', v_people.people_id, 'People Previous Account Receivable', 
			v_people.accounts_receivable, 0, v_account_receivable_ledger.oid, v_account_receivable_ledger.ledger_code, (select ledger_balance 
			from ledger where oid = v_account_receivable_ledger.oid), 
			v_sub_ledger.oid, v_sub_ledger.sub_ledger_code, v_sub_ledger.sub_ledger_balance, 'People', v_people.oid, '1', 'Active', v_journal_summary_oid, v_financial_period.oid, 
			p_institute_oid, v_people.created_by);
			
			UPDATE ledger set ledger_balance = (ledger_balance + v_people.accounts_receivable) where oid = v_account_receivable_ledger.oid;	
			UPDATE sub_ledger set sub_ledger_balance = (sub_ledger_balance + v_people.accounts_receivable) where oid = v_sub_ledger.oid;
			
			SELECT * INTO v_adjustment_receivable_ledger FROM ledger WHERE oid = (SELECT ledger_oid FROM ledger_setting WHERE institute_oid = p_institute_oid 
			and ledger_key = 'AdjustmentReceivable');
			
			INSERT INTO journal(oid, journal_entry_date, journal_entry_no, journal_type, reference_no, remarks, debited_amount, credited_amount, ledger_oid, ledger_code, ledger_balance, 
			sub_ledger_oid, sub_ledger_code, sub_ledger_balance, reference_type, reference_oid, version_id, status, journal_summary_oid, financial_period_oid, institute_oid, created_by) 
			VALUES(concat(v_eiin_oid, '-Jounal-', uuid()), now(), 2, 'AdjustmentReceivable', v_people.people_id, 'Adjustment Accounts Receivable', 
			0, v_people.accounts_receivable, v_adjustment_receivable_ledger.oid,v_adjustment_receivable_ledger.ledger_code, 
			(select ledger_balance from ledger where oid = v_adjustment_receivable_ledger.oid), null, null, null, 
			'People', v_people.oid, '1', 'Active', v_journal_summary_oid, v_financial_period.oid, p_institute_oid, v_people.created_by);
			
			UPDATE ledger set ledger_balance = (ledger_balance + v_people.accounts_receivable) where oid = v_adjustment_receivable_ledger.oid;        				
		END IF;
		
	    END IF;
	    
	    If (select count(oid) from sub_ledger where ledger_key = 'AccountPayable' and reference_oid = v_people.oid) = 0 THEN
		
		
		select case when count(*)+1 > 9 then concat(v_account_payable_ledger.ledger_code, (count(*)+1)) :: text 
		else concat(v_account_payable_ledger.ledger_code, '0', (count(*)+1)) :: text end INTO v_sub_ledger_code 
		from sub_ledger sl where sl.ledger_oid = v_account_payable_ledger.oid;
		
		INSERT INTO sub_ledger(oid, ledger_key, name_en, name_bn, sub_ledger_code, mnemonic, sub_ledger_type, is_balance_sheet_item, 
		sub_ledger_balance, ledger_code, version_id, status, reference_type, reference_oid, ledger_oid, institute_oid, created_by)
		VALUES(concat(v_eiin_oid, uuid()), 'AccountPayable', v_people.name_en, v_people.name_bn, v_sub_ledger_code, v_people.name_en, v_account_payable_ledger.ledger_type, 
		v_account_payable_ledger.is_balance_sheet_item, 0, v_account_payable_ledger.ledger_code, v_account_payable_ledger.version_id, 'Active', 'People', v_people.oid, 
		v_account_payable_ledger.oid, p_institute_oid, v_people.created_by);
		
		IF coalesce(v_people.accounts_payable::float, 0) > 0 THEN    
		    
			SELECT concat(v_eiin_oid, '-Jou-Sum-', uuid()) INTO v_journal_summary_oid;
			SELECT * INTO v_sub_ledger FROM sub_ledger WHERE institute_oid = p_institute_oid and reference_oid = v_people.oid and ledger_key = 'AccountPayable';
			
			INSERT INTO journal_summary(oid, journal_entry_date, journal_type, journal_manner, amount, reference_no, version_id, remarks, status, 
			financial_period_oid, institute_oid, created_by) VALUES(v_journal_summary_oid, now(), 'AccountPayable', 'Auto', v_people.accounts_payable, 
			v_people.people_id, '1', 'People Previous Account Payable Adjustment', 'Active', v_financial_period.oid, p_institute_oid, v_people.created_by);				
			
			INSERT INTO journal(oid, journal_entry_date, journal_entry_no, journal_type, reference_no, remarks, debited_amount, credited_amount, ledger_oid, ledger_code, ledger_balance, 
			sub_ledger_oid, sub_ledger_code, sub_ledger_balance, reference_type, reference_oid, version_id, status, journal_summary_oid, financial_period_oid, institute_oid, created_by) 
			VALUES(concat(v_eiin_oid, '-Jounal-', uuid()), now(), 1, 'AccountPayable', v_people.people_id, 'People Previous Account Payable', 
			0, v_people.accounts_payable,v_account_payable_ledger.oid, v_account_payable_ledger.ledger_code, v_account_payable_ledger.ledger_balance, 
			v_sub_ledger.oid, v_sub_ledger.sub_ledger_code, v_sub_ledger.sub_ledger_balance, 'People', v_people.oid, '1', 'Active', v_journal_summary_oid, v_financial_period.oid, 
			p_institute_oid, v_people.created_by);
			
			UPDATE ledger set ledger_balance = (ledger_balance + v_people.accounts_payable) where oid = v_account_payable_ledger.oid;	
			UPDATE sub_ledger set sub_ledger_balance = (sub_ledger_balance + v_people.accounts_payable) where oid = v_sub_ledger.oid;
			
			SELECT * INTO v_adjustment_payable_ledger FROM ledger WHERE oid = (SELECT ledger_oid FROM ledger_setting WHERE institute_oid = p_institute_oid and ledger_key = 'AdjustmentPayable');
			
			INSERT INTO journal(oid, journal_entry_date, journal_entry_no, journal_type, reference_no, remarks, debited_amount, credited_amount, ledger_oid, ledger_code, ledger_balance, 
			sub_ledger_oid, sub_ledger_code, sub_ledger_balance, reference_type, reference_oid, version_id, status, journal_summary_oid, financial_period_oid, institute_oid, created_by) 
			VALUES(concat(v_eiin_oid, '-Jounal-', uuid()), now(), 2, 'AdjustmentPayable', v_people.people_id, 'Adjustment Accounts Payable', 
			v_people.accounts_payable, 0, v_adjustment_payable_ledger.oid, v_adjustment_payable_ledger.ledger_code, 
			(select ledger_balance from ledger where oid = v_adjustment_payable_ledger.oid), null, null, null, 
			'People', v_people.oid, '1', 'Active', v_journal_summary_oid, v_financial_period.oid, p_institute_oid, v_people.created_by);
			
			UPDATE ledger set ledger_balance = (ledger_balance + v_people.accounts_payable) where oid = v_adjustment_payable_ledger.oid;        				
		END IF;
		
	    END IF;
	    
	    If (select count(oid) from sub_ledger where ledger_key = 'CreditNote' and reference_oid = v_people.oid) = 0 THEN
		
		
		select case when count(*)+1 > 9 then concat(v_credit_note_ledger.ledger_code, (count(*)+1)) :: text 
		else concat(v_credit_note_ledger.ledger_code, '0', (count(*)+1)) :: text end INTO v_sub_ledger_code 
		from sub_ledger sl where sl.ledger_oid = v_credit_note_ledger.oid;
		
		INSERT INTO sub_ledger(oid, ledger_key, name_en, name_bn, sub_ledger_code, mnemonic, sub_ledger_type, is_balance_sheet_item, 
		sub_ledger_balance, ledger_code, version_id, status, reference_type, reference_oid, ledger_oid, institute_oid, created_by)
		VALUES(concat(v_eiin_oid, uuid()), 'CreditNote', v_people.name_en, v_people.name_bn, v_sub_ledger_code, v_people.name_en, v_credit_note_ledger.ledger_type, 
		v_credit_note_ledger.is_balance_sheet_item, 0, v_credit_note_ledger.ledger_code, v_credit_note_ledger.version_id, 'Active', 'People', v_people.oid, 
		v_credit_note_ledger.oid, p_institute_oid, v_people.created_by);
		
		
		IF coalesce(v_people.vendor_credit::float, 0) > 0 THEN    
		    
			SELECT concat(v_eiin_oid, '-Jou-Sum-', uuid()) INTO v_journal_summary_oid;
			SELECT * INTO v_sub_ledger FROM sub_ledger WHERE institute_oid = p_institute_oid and reference_oid = v_people.oid and ledger_key = 'VendorCredit';
			
			INSERT INTO journal_summary(oid, journal_entry_date, journal_type, journal_manner, amount, reference_no, version_id, remarks, status, 
			financial_period_oid, institute_oid, created_by) VALUES(v_journal_summary_oid, now(), 'VendorCredit', 'Auto', v_people.vendor_credit, 
			v_people.people_id, '1', 'People Previous Vendor Credit (Advance Payment)', 'Active', v_financial_period.oid, p_institute_oid, v_people.created_by);				
			
			INSERT INTO journal(oid, journal_entry_date, journal_entry_no, journal_type, reference_no, remarks, debited_amount, credited_amount, ledger_oid, ledger_code, ledger_balance, 
			sub_ledger_oid, sub_ledger_code, sub_ledger_balance, reference_type, reference_oid, version_id, status, journal_summary_oid, financial_period_oid, institute_oid, created_by) 
			VALUES(concat(v_eiin_oid, '-Jounal-', uuid()), now(), 1, 'VendorCredit', v_people.people_id, 'People Previous Vendor Credit (Advance Payment)', 
			v_people.vendor_credit, 0, v_vendor_credit_ledger.oid, v_vendor_credit_ledger.ledger_code, (select ledger_balance from ledger where oid = v_vendor_credit_ledger.oid), 
			v_sub_ledger.oid, v_sub_ledger.sub_ledger_code, v_sub_ledger.sub_ledger_balance, 'People', v_people.oid, '1', 'Active', v_journal_summary_oid, v_financial_period.oid, 
			p_institute_oid, v_people.created_by);
			
			UPDATE ledger set ledger_balance = (ledger_balance + v_people.vendor_credit) where oid = v_vendor_credit_ledger.oid;	
			UPDATE sub_ledger set sub_ledger_balance = (sub_ledger_balance + v_people.vendor_credit) where oid = v_sub_ledger.oid;
			
			SELECT * INTO v_adjustment_vendor_credit_ledger FROM ledger WHERE oid = (SELECT ledger_oid FROM ledger_setting 
			WHERE institute_oid = p_institute_oid and ledger_key = 'AdjustmentVendorCredit');
			
			INSERT INTO journal(oid, journal_entry_date, journal_entry_no, journal_type, reference_no, remarks, debited_amount, credited_amount, ledger_oid, ledger_code, ledger_balance, 
			sub_ledger_oid, sub_ledger_code, sub_ledger_balance, reference_type, reference_oid, version_id, status, journal_summary_oid, financial_period_oid, institute_oid, created_by) 
			VALUES(concat(v_eiin_oid, '-Jounal-', uuid()), now(), 2, 'AdjustmentVendorCredit', v_people.people_id, 'Adjustment Vendor Credit', 
			0, v_people.vendor_credit, v_adjustment_vendor_credit_ledger.oid,v_adjustment_vendor_credit_ledger.ledger_code, 
			(select ledger_balance from ledger where oid = v_adjustment_vendor_credit_ledger.oid), null, null, null, 
			'People', v_people.oid, '1', 'Active', v_journal_summary_oid, v_financial_period.oid, p_institute_oid, v_people.created_by);
			
			UPDATE ledger set ledger_balance = (ledger_balance + v_people.vendor_credit) where oid = v_adjustment_vendor_credit_ledger.oid;        				
		END IF;
		
	    END IF;
	    
	    If (select count(oid) from sub_ledger where ledger_key = 'VendorCredit' and reference_oid = v_people.oid) = 0 THEN
		
		
		select case when count(*)+1 > 9 then concat(v_vendor_credit_ledger.ledger_code, (count(*)+1)) :: text 
		else concat(v_vendor_credit_ledger.ledger_code, '0', (count(*)+1)) :: text end INTO v_sub_ledger_code 
		from sub_ledger sl where sl.ledger_oid = v_vendor_credit_ledger.oid;
		
		INSERT INTO sub_ledger(oid, ledger_key, name_en, name_bn, sub_ledger_code, mnemonic, sub_ledger_type, is_balance_sheet_item, 
		sub_ledger_balance, ledger_code, version_id, status, reference_type, reference_oid, ledger_oid, institute_oid, created_by)
		VALUES(concat(v_eiin_oid, uuid()), 'VendorCredit', v_people.name_en, v_people.name_bn, v_sub_ledger_code, v_people.name_en, v_vendor_credit_ledger.ledger_type, 
		v_vendor_credit_ledger.is_balance_sheet_item, 0, v_vendor_credit_ledger.ledger_code, v_vendor_credit_ledger.version_id, 'Active', 'People', v_people.oid, 
		v_vendor_credit_ledger.oid, p_institute_oid, v_people.created_by);
		
		IF coalesce(v_people.credit_note::float, 0) > 0 THEN    
		    
			SELECT concat(v_eiin_oid, '-Jou-Sum-', uuid()) INTO v_journal_summary_oid;
			SELECT * INTO v_sub_ledger FROM sub_ledger WHERE institute_oid = p_institute_oid and reference_oid = v_people.oid and ledger_key = 'CreditNote';
			
			INSERT INTO journal_summary(oid, journal_entry_date, journal_type, journal_manner, amount, reference_no, version_id, remarks, status, 
			financial_period_oid, institute_oid, created_by) VALUES(v_journal_summary_oid, now(), 'CreditNote', 'Auto', v_people.credit_note, 
			v_people.people_id, '1', 'People Previous Credit Note (Advance Received) Adjustment', 'Active', v_financial_period.oid, 
			p_institute_oid, v_people.created_by);				
			
			INSERT INTO journal(oid, journal_entry_date, journal_entry_no, journal_type, reference_no, remarks, debited_amount, credited_amount, ledger_oid, ledger_code, ledger_balance, 
			sub_ledger_oid, sub_ledger_code, sub_ledger_balance, reference_type, reference_oid, version_id, status, journal_summary_oid, financial_period_oid, institute_oid, created_by) 
			VALUES(concat(v_eiin_oid, '-Jounal-', uuid()), now(), 1, 'CreditNote', v_people.people_id, 'People Previous Account Payable', 
			0, v_people.credit_note,v_credit_note_ledger.oid, v_credit_note_ledger.ledger_code, v_credit_note_ledger.ledger_balance, 
			v_sub_ledger.oid, v_sub_ledger.sub_ledger_code, v_sub_ledger.sub_ledger_balance, 'People', v_people.oid, '1', 'Active', v_journal_summary_oid, v_financial_period.oid, 
			p_institute_oid, v_people.created_by);
			
			UPDATE ledger set ledger_balance = (ledger_balance + v_people.credit_note) where oid = v_credit_note_ledger.oid;	
			UPDATE sub_ledger set sub_ledger_balance = (sub_ledger_balance + v_people.credit_note) where oid = v_sub_ledger.oid;
			
			SELECT * INTO v_adjustment_credit_note_ledger FROM ledger WHERE oid = (SELECT ledger_oid FROM ledger_setting WHERE institute_oid = p_institute_oid 
			and ledger_key = 'AdjustmentCreditNote');
			
			INSERT INTO journal(oid, journal_entry_date, journal_entry_no, journal_type, reference_no, remarks, debited_amount, credited_amount, ledger_oid, ledger_code, ledger_balance, 
			sub_ledger_oid, sub_ledger_code, sub_ledger_balance, reference_type, reference_oid, version_id, status, journal_summary_oid, financial_period_oid, institute_oid, created_by) 
			VALUES(concat(v_eiin_oid, '-Jounal-', uuid()), now(), 2, 'AdjustmentCreditNote', v_people.people_id, 'Adjustment Credit Note', 
			v_people.credit_note, 0, v_adjustment_credit_note_ledger.oid, v_adjustment_credit_note_ledger.ledger_code, 
			(select ledger_balance from ledger where oid = v_adjustment_credit_note_ledger.oid), null, null, null, 
			'People', v_people.oid, '1', 'Active', v_journal_summary_oid, v_financial_period.oid, p_institute_oid, v_people.created_by);
			
			UPDATE ledger set ledger_balance = (ledger_balance + v_people.credit_note) where oid = v_adjustment_credit_note_ledger.oid;        				
		END IF;
		
	    END IF;
        
	END LOOP;
	
    END;
$create_people_sub_ledger_by_institute$ LANGUAGE plpgsql;
-- SELECT create_people_sub_ledger_by_institute('10', '10');


--DROP FUNCTION IF EXISTS create_sub_ledger_by_all_institute();
CREATE OR REPLACE FUNCTION create_sub_ledger_by_all_institute()
RETURNS void AS $create_sub_ledger_by_all_institute$
    DECLARE
    	v_institute			record;
    	
    	
    BEGIN
	
	for v_institute in (SELECT * FROM schoolerp.institute) loop 
		perform create_student_sub_ledger_by_institute(v_institute.oid);
		perform create_people_sub_ledger_by_institute(v_institute.oid);

	end loop;
	
	
    END;
$create_sub_ledger_by_all_institute$ LANGUAGE plpgsql;
-- SELECT create_sub_ledger_by_all_institute();


