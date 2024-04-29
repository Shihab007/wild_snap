--DROP FUNCTION IF EXISTS student_promotion(varchar(128));
CREATE OR REPLACE FUNCTION student_promotion(p_student_oid varchar(128), p_admission_amount numeric(10), p_created_by varchar(128))
RETURNS void AS $student_promotion$
    DECLARE
    	v_student				record;
        debit                           	json;
        credit                          	json;
        journal_list                    	json;
        v_journal_summary               	json;    
    	
    BEGIN
    
        SELECT * INTO v_student FROM student WHERE oid = p_student_oid;
        	
        IF p_admission_amount > 0 THEN 
		-- Debit
		SELECT JSON_BUILD_OBJECT(
		    'ledgerOid', (SELECT ledger_oid FROM ledger_setting WHERE institute_oid = v_student.institute_oid and ledger_key = 'AcademicFee'),
		    'journalType', 'Admission',
		    'journalEntryNo', 1,
		    'referenceNo', v_student.student_id,
		    'remarks', '',
		    'debitedAmount', p_admission_amount,
		    'creditedAmount', 0,
		    'subLedgerOid', (SELECT oid FROM sub_ledger WHERE institute_oid = v_student.institute_oid and ledger_key = 'AcademicFee' and reference_oid = p_student_oid),
		    'referenceType', 'Student',
		    'referenceOid', v_student.oid
		) INTO debit;

		-- Credit
		SELECT JSON_BUILD_OBJECT(
		    'ledgerOid', (SELECT ledger_oid FROM ledger_setting WHERE institute_oid = v_student.institute_oid and ledger_key = 'AcademicFeeCollection'),
		    'journalType', 'Admission',
		    'journalEntryNo', 1,
		    'referenceNo', v_student.student_id,
		    'remarks', '',
		    'debitedAmount', 0,
		    'creditedAmount', p_admission_amount
		) INTO credit;
		
		SELECT json_build_array(debit, credit) INTO journal_list;
		
		
		SELECT JSON_BUILD_OBJECT(
		    'journalType', 'Admission',
		    'journalManner', 'Auto',
		    'remarks', '',
		    'amount', p_admission_amount,
		    'referenceNo', v_student.student_id,
		    'instituteOid', v_student.institute_oid,
		    'createdBy', p_created_by,
		    'journalList', journal_list
		) INTO v_journal_summary;

		
		perform post_journal(v_journal_summary);
		
        END IF;
	
    END;
$student_promotion$ LANGUAGE plpgsql;
-- SELECT student_promotion('10', '10');



--DROP FUNCTION IF EXISTS student_promotion_journal(varchar(128));
CREATE OR REPLACE FUNCTION student_promotion_journal(p_promotion_oid varchar(128))
RETURNS void AS $student_promotion_journal$
    DECLARE
    	v_student_promotion			record;
    	v_student_promotion_detail		record;
        debit                           	json;
        credit                          	json;
        journal_list                    	json;
        v_journal_summary               	json;  
        v_student_oid                		varchar(128);  
    	
    BEGIN
    
        SELECT * INTO v_student_promotion FROM student_promotion WHERE oid = p_promotion_oid;      
    
        for v_student_promotion_detail in (select spd.student_id, spd.admission_fee_amount from student_promotion_detail spd where 1 = 1 and spd.student_promotion_oid = p_promotion_oid) loop 
        		
		IF v_student_promotion_detail.admission_fee_amount > 0 THEN 
		
        		SELECT oid INTO v_student_oid FROM student WHERE student_id = v_student_promotion_detail.student_id;
        
			-- Debit
			SELECT JSON_BUILD_OBJECT(
			    'ledgerOid', (SELECT ledger_oid FROM ledger_setting WHERE institute_oid = v_student_promotion.institute_oid and ledger_key = 'AcademicFee'),
			    'journalType', 'Admission',
			    'journalEntryNo', 1,
			    'referenceNo', v_student_promotion_detail.student_id,
			    'remarks', '',
			    'debitedAmount', v_student_promotion_detail.admission_fee_amount,
			    'creditedAmount', 0,
			    'subLedgerOid', (SELECT oid FROM sub_ledger WHERE institute_oid = v_student_promotion.institute_oid and ledger_key = 'AcademicFee' and reference_oid = v_student_oid),
			    'referenceType', 'Student',
			    'referenceOid', v_student_oid
			) INTO debit;

			-- Credit
			SELECT JSON_BUILD_OBJECT(
			    'ledgerOid', (SELECT ledger_oid FROM ledger_setting WHERE institute_oid = v_student_promotion.institute_oid and ledger_key = 'AcademicFeeCollection'),
			    'journalType', 'Admission',
			    'journalEntryNo', 1,
			    'referenceNo', v_student_promotion_detail.student_id,
			    'remarks', '',
			    'debitedAmount', 0,
			    'creditedAmount', v_student_promotion_detail.admission_fee_amount
			) INTO credit;
			
			SELECT json_build_array(debit, credit) INTO journal_list;
			
			
			SELECT JSON_BUILD_OBJECT(
			    'journalType', 'Admission',
			    'journalManner', 'Auto',
			    'remarks', '',
			    'amount', v_student_promotion_detail.admission_fee_amount,
			    'referenceNo', v_student_promotion_detail.student_id,
			    'instituteOid', v_student_promotion.institute_oid,
			    'createdBy', v_student_promotion.created_by,
			    'journalList', journal_list
			) INTO v_journal_summary;

			
			perform post_journal(v_journal_summary);
			
		END IF;
        	
	end loop;
	
    END;
$student_promotion_journal$ LANGUAGE plpgsql;
-- SELECT student_promotion_journal('10');


--DROP FUNCTION IF EXISTS create_student_batch_voucher_by_promotion_oid(varchar(128));
CREATE OR REPLACE FUNCTION create_student_batch_voucher_by_promotion_oid(p_promotion_oid varchar(128))
RETURNS void AS $create_student_batch_voucher_by_promotion_oid$
    DECLARE
    	v_student_promotion			record;
    	v_student				record;
    	v_fee_setting				record;
    	v_fee_setting_detail			record;
        v_billing_period                	varchar(128);  
	v_timestamp                     	varchar(128);
    	v_fee_due_oid				varchar(128);
    	v_fee_due_id				varchar(128);
    	v_voucher_oid				varchar(128);
    	v_voucher_no				varchar(128);
    	v_fee_due				record;
    	v_fee_due_detail			record;
    	v_debit_ledger_oid			varchar(128);
    	v_credit_ledger_oid			varchar(128);
    	v_debit_sub_ledger_oid			varchar(128);
    	v_credit_sub_ledger_oid			varchar(128);
        debit                           	json;
        credit                          	json;
        journal_list                    	json;
        v_journal_summary               	json;
    	v_class					record;
        sortOrder		               	int4;
    	
    BEGIN
    
        SELECT * INTO v_student_promotion FROM student_promotion WHERE oid = p_promotion_oid;    
    	SELECT ledger_oid INTO v_debit_ledger_oid FROM ledger_setting WHERE institute_oid = v_student_promotion.institute_oid and ledger_key = 'AcademicFee';    		
    	SELECT ledger_oid INTO v_credit_ledger_oid FROM ledger_setting WHERE institute_oid =  v_student_promotion.institute_oid and ledger_key = 'AcademicFeeCollection';
    
        for v_student in (select s.oid as student_oid, spd.student_id, se.name_en as institute_session_name_en, spd.institute_session_oid, spd.institute_class_oid, 
        	spd.institute_class_section_oid, spd.institute_class_group_oid from student_promotion_detail spd, student s, institute_session se where 1 = 1 and s.student_id = spd.student_id 
	        and spd.student_promotion_oid = p_promotion_oid and se.oid = spd.institute_session_oid) loop 
    	
    		SELECT oid INTO v_debit_sub_ledger_oid from sub_ledger WHERE ledger_key = 'AcademicFee' and reference_oid = v_student.student_oid;
    	
        	SELECT * INTO v_fee_setting FROM fee_setting WHERE session_oid = v_student.institute_session_oid and institute_class_oid = v_student.institute_class_oid and fee_head_group_code = '101';
        	
        	IF char_length(v_student.institute_session_name_en)::int4 = 4 THEN
        		v_billing_period := v_student.institute_session_name_en;
        	ELSE 
			sortOrder := 0;
			for v_class in (select ic.oid from institute_class ic where ic.institute_class_level_oid = (select institute_class_level_oid 
			from institute_class where oid = v_student.institute_class_oid)) loop
			
		    		IF v_class.oid <> v_student.institute_class_oid THEN
		    			select (substring(name_en, 1,4)::int4 + sortOrder) INTO v_billing_period from institute_session where oid = v_student.institute_session_oid;
				END IF;
				sortOrder := sortOrder + 1;
			end loop;
        	
		END IF;
		
		SELECT to_char(clock_timestamp(), 'YYYYMMDDHH24MISSMS') INTO v_timestamp;
		SELECT concat('SCHOOL-ERP-Fee-Due-', v_timestamp, '-', random_number()) INTO v_fee_due_oid;
		SELECT concat('FD-', random_number()) INTO v_fee_due_id;
		SELECT concat('SCHOOL-ERP-Voucher-', v_timestamp, '-', random_number()) INTO v_voucher_oid;
		SELECT concat('V-', random_number()) INTO v_voucher_no;
     
		If (select count(oid) from schoolerp.fee_due WHERE billing_period = v_billing_period and fee_setting_oid = v_fee_setting.oid
			and student_id = v_student.student_id) = 0 THEN	

			INSERT INTO schoolerp.fee_due(oid, fee_due_id, name_en, name_bn, fee_due_date, payment_last_date, fee_amount, due_amount, remarks, status, debit_ledger_oid, debit_sub_ledger_oid, 
			credit_ledger_oid, credit_sub_ledger_oid, student_id, institute_class_group_oid, institute_class_section_oid, institute_class_oid, institute_session_oid, billing_period, 
			fee_setting_oid, fee_head_group_oid, fee_head_group_code, institute_oid, created_by) VALUES(v_fee_due_oid, v_fee_due_id, v_fee_setting.name_en, v_fee_setting.name_bn, now(), 
			v_fee_setting.payment_last_date, v_fee_setting.amount, v_fee_setting.amount, 'Admission Fee', 'Due', v_debit_ledger_oid, v_debit_sub_ledger_oid, v_credit_ledger_oid, 
			v_credit_sub_ledger_oid, v_student.student_id, v_student.institute_class_group_oid, v_student.institute_class_section_oid, v_student.institute_class_oid, 
			v_student.institute_session_oid, v_billing_period, v_fee_setting.oid, v_fee_setting.fee_head_group_oid, v_fee_setting.fee_head_group_code, 
			v_student_promotion.institute_oid, v_student_promotion.created_by);
			
			for v_fee_setting_detail in (SELECT * FROM schoolerp.fee_setting_detail fsd where fsd.fee_setting_oid = v_fee_setting.oid) loop 
			
				INSERT INTO schoolerp.fee_due_detail(oid, fee_amount, fee_head_oid, fee_due_oid, institute_oid, created_by) 
				VALUES(concat('SCHOOL-ERP-FD-Detail-', v_timestamp, '-', random_number()), v_fee_setting_detail.amount, 
				v_fee_setting_detail.fee_head_oid, v_fee_due_oid, v_student_promotion.institute_oid, v_student_promotion.created_by);
				
			end loop;

			
        		SELECT * INTO v_fee_due FROM fee_due WHERE oid = v_fee_due_oid;
			
			INSERT INTO schoolerp.voucher(oid, voucher_no, name_en, name_bn, voucher_date, payment_last_date, fee_amount, waiver_amount, discount_amount, due_amount, paid_amount, 
			remarks, status, debit_ledger_oid, debit_sub_ledger_oid, credit_ledger_oid, credit_sub_ledger_oid, fee_due_oid, student_id, institute_class_group_oid, 
			institute_class_section_oid, institute_class_oid, institute_session_oid, fee_head_group_oid, fee_head_group_code, institute_oid, created_by) 
			VALUES(v_voucher_oid, v_voucher_no, v_fee_due.name_en, v_fee_due.name_bn, now(), v_fee_due.payment_last_date, v_fee_due.fee_amount, v_fee_due.waiver_amount, 
			v_fee_due.discount_amount, v_fee_due.due_amount, v_fee_due.paid_amount, 'Student Admission Fee', 'Due', v_debit_ledger_oid, v_debit_sub_ledger_oid, v_credit_ledger_oid, 
			v_credit_sub_ledger_oid, v_fee_due_oid, v_fee_due.student_id, v_fee_due.institute_class_group_oid, v_fee_due.institute_class_section_oid, 
			v_fee_due.institute_class_oid, v_fee_due.institute_session_oid, v_fee_due.fee_head_group_oid, v_fee_due.fee_head_group_code, 
			v_student_promotion.institute_oid, v_student_promotion.created_by);

			for v_fee_due_detail in (SELECT * FROM schoolerp.fee_due_detail fdd where fdd.fee_due_oid = v_fee_due_oid) loop 
				INSERT INTO schoolerp.voucher_detail(oid, fee_amount, fee_head_oid, vouchere_oid, institute_oid, created_by) 
				VALUES(concat('SCHOOL-ERP-VD-', v_timestamp, '-', random_number()), v_fee_due_detail.fee_amount, 
				v_fee_due_detail.fee_head_oid, v_voucher_oid, v_fee_due.institute_oid, v_student_promotion.created_by);
			end loop;
			
			-- Debit
			SELECT JSON_BUILD_OBJECT(
			    'ledgerOid', v_debit_ledger_oid,
			    'journalType', 'Voucher',
			    'journalEntryNo', 1,
			    'referenceNo', v_voucher_no,
			    'remarks', '',
			    'debitedAmount', v_fee_setting.amount,
			    'creditedAmount', 0,
			    'subLedgerOid', v_debit_sub_ledger_oid,
			    'referenceType', 'Student',
			    'referenceOid', v_student.student_oid
			) INTO debit;

			-- Credit
			SELECT JSON_BUILD_OBJECT(
			    'ledgerOid', v_credit_ledger_oid,
			    'journalType', 'Voucher',
			    'journalEntryNo', 1,
			    'referenceNo', v_voucher_no,
			    'remarks', '',
			    'debitedAmount', 0,
			    'creditedAmount', v_fee_setting.amount,
			    'subLedgerOid', v_credit_sub_ledger_oid,
			    'referenceType', null,
			    'referenceOid', null
			) INTO credit;
			
			SELECT json_build_array(debit, credit) INTO journal_list;
			
			SELECT JSON_BUILD_OBJECT(
			    'journalType', 'Voucher',
			    'journalManner', 'Auto',
			    'remarks', '',
			    'amount', v_fee_setting.amount,
			    'referenceNo', v_voucher_no,
			    'instituteOid', v_student_promotion.institute_oid,
			    'createdBy', v_student_promotion.created_by,
			    'journalList', journal_list
			) INTO v_journal_summary;

			
			perform post_journal(v_journal_summary);
			
		END IF;
        	
	end loop;
	
    END;
$create_student_batch_voucher_by_promotion_oid$ LANGUAGE plpgsql;
-- SELECT create_student_batch_voucher_by_promotion_oid('10');




