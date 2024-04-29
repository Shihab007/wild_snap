-- DROP FUNCTION IF EXISTS schoolerp.addmission_fees_calculate();

CREATE OR REPLACE FUNCTION schoolerp.addmission_fees_calculate(p_data varchar(4096), instituteOid varchar(128), instituteClassOid varchar(128), sessionOid varchar(128), groupCode varchar(128))
RETURNS void AS $addmission_fees_calculate$
declare
    	fees_oid	varchar(128);
    	v_json          json;
    		    feesSettingCoursor CURSOR FOR SELECT * FROM schoolerp.fees_setting where institute_oid = instituteOid and institute_class_oid = instituteClassOid and session_oid = sessionOid and group_code = groupCode;
	    
begin
	SELECT p_data::json INTO v_json;
  	for feesSetting in feesSettingCoursor loop
    	fees_oid = uuid();

    	INSERT INTO schoolerp.due_fees
    	(oid, head_code, fee_head_oid, session_oid, institute_oid, institute_class_oid, due_amount, remarks, status, is_mandatory, created_by, created_on, application_tracking_id)

    	VALUES(fees_oid, feesSetting.head_code, feesSetting.fee_head_oid, feesSetting.session_oid, feesSetting.institute_oid,
    	feesSetting.institute_class_oid, feesSetting.amount, v_json->>'remarks', v_json->>'status', feesSetting.is_mandatory, v_json->>'createdBy', CURRENT_TIMESTAMP, v_json->>'applicationTrackingId');

    	INSERT INTO schoolerp.due_fees_history
    	(oid, due_fees_oid, head_code, fee_head_oid, session_oid, institute_oid, institute_class_oid, due_amount, remarks, status, is_mandatory, created_by, created_on)

    	VALUES(uuid(), fees_oid, feesSetting.head_code, feesSetting.fee_head_oid, feesSetting.session_oid, feesSetting.institute_oid, feesSetting.institute_class_oid, feesSetting.amount, v_json->>'remarks', v_json->>'status', feesSetting.is_mandatory, v_json->>'createdBy', CURRENT_TIMESTAMP);

  	end loop;
  END;
$addmission_fees_calculate$ LANGUAGE plpgsql;

-- SELECT addmission_fees_calculate('{"instituteClassOid":"SCHOOL-ERP-Institute-Class-6","createdBy":"Kamal Parvez","studentOid":"SCHOOL-ERP-Institute-Student-0001","sessionOid":"SCHOOL-ERP-Institute-Student-0001","applicationTrackingId":"1234","instituteOid":"SCHOOL-ERP-Demo-School-001","remarks":"Test Purpose","status":"Active"}','SCHOOL-ERP-Demo-School-001', 'SCHOOL-ERP-Institute-Class-6', 'SCHOOL-ERP-Institute-Session-2022');


CREATE OR REPLACE FUNCTION schoolerp.addmission_fees_calculate(p_data varchar(4096), instituteOid varchar(128), instituteClassOid varchar(128), sessionOid varchar(128))
RETURNS void AS $addmission_fees_calculate$
declare
    	fees_oid	varchar(128);
    	v_json          json;
    		    
	    feesSettingCoursor CURSOR FOR SELECT * FROM schoolerp.fees_setting where institute_oid = instituteOid and institute_class_oid = instituteClassOid and session_oid = sessionOid and head_code in ('ADMISSION_FEE', 'ANNUAL_CHARGE','DEVELOPMENT_CHARGE','OTHERS','UTILITY_CHARGE');
begin
	SELECT p_data::json INTO v_json;
  	for feesSetting in feesSettingCoursor loop
    	fees_oid = uuid();

    	INSERT INTO schoolerp.due_fees
    	(oid, head_code, fee_head_oid, session_oid, institute_oid, institute_class_oid, due_amount, remarks, status, is_mandatory, created_by, created_on, application_tracking_id)

    	VALUES(fees_oid, feesSetting.head_code, feesSetting.fee_head_oid, feesSetting.session_oid, feesSetting.institute_oid,
    	feesSetting.institute_class_oid, feesSetting.amount, v_json->>'remarks', v_json->>'status', feesSetting.is_mandatory, v_json->>'createdBy', CURRENT_TIMESTAMP, v_json->>'applicationTrackingId');

    	INSERT INTO schoolerp.due_fees_history
    	(oid, due_fees_oid, head_code, fee_head_oid, session_oid, institute_oid, institute_class_oid, due_amount, remarks, status, is_mandatory, created_by, created_on)

    	VALUES(uuid(), fees_oid, feesSetting.head_code, feesSetting.fee_head_oid, feesSetting.session_oid, feesSetting.institute_oid, feesSetting.institute_class_oid, feesSetting.amount, v_json->>'remarks', v_json->>'status', feesSetting.is_mandatory, v_json->>'createdBy', CURRENT_TIMESTAMP);

  	end loop;
  END;
$addmission_fees_calculate$ LANGUAGE plpgsql;

-- SELECT addmission_fees_calculate('{"instituteClassOid":"SCHOOL-ERP-Institute-Class-6","createdBy":"Kamal Parvez","studentOid":"SCHOOL-ERP-Institute-Student-0001","sessionOid":"SCHOOL-ERP-Institute-Student-0001","applicationTrackingId":"1234","instituteOid":"SCHOOL-ERP-Demo-School-001","remarks":"Test Purpose","status":"Active"}','SCHOOL-ERP-Demo-School-001', 'SCHOOL-ERP-Institute-Class-6', 'SCHOOL-ERP-Institute-Session-2022');


-- DROP FUNCTION IF EXISTS schoolerp.insert_due_fees_with_history();

CREATE OR REPLACE FUNCTION schoolerp.insert_due_fees_with_history(p_data varchar(2048), p_institute_oid varchar(128), instituteClassOid varchar(128), sessionOid varchar(128), dueAmount numeric(20, 2))
RETURNS void AS $insert_due_fees_with_history$
declare
    	fees_oid				varchar(128);
    	debit_ledger_oid			varchar(128);
    	credit_ledger_oid			varchar(128);
        debit                           	json;
        credit                          	json;
        journal_list                    	json;
        v_journal_summary               	json;
    	v_json          json;
	    studentCoursor CURSOR FOR SELECT * FROM schoolerp.student where institute_oid = p_institute_oid and institute_class_oid = instituteClassOid and institute_session_oid = sessionOid;
begin
	SELECT p_data::json INTO v_json;
    	
    	SELECT ledger_oid INTO debit_ledger_oid FROM ledger_setting WHERE institute_oid = p_institute_oid and ledger_key = 'AcademicFee';
    	SELECT ledger_oid INTO credit_ledger_oid FROM ledger_setting WHERE institute_oid = p_institute_oid and ledger_key = 'AcademicFeeCollection';
	
  	for studentCur in studentCoursor loop
    	fees_oid = uuid();

    	INSERT INTO schoolerp.due_fees
    	(oid, student_id , student_oid , head_code, fee_head_oid, session_oid, institute_oid, institute_class_oid, due_amount, remarks, status, created_by, created_on)

    	VALUES(fees_oid, studentCur.student_id, studentCur.oid, v_json->>'headCode', v_json->>'feeHeadOid', studentCur.institute_session_oid, studentCur.institute_oid, studentCur.institute_class_oid,  dueAmount, v_json->>'remarks', v_json->>'status', v_json->>'createdBy', CURRENT_TIMESTAMP);

    	INSERT INTO schoolerp.due_fees_history
    	(oid, due_fees_oid, head_code, fee_head_oid, session_oid, institute_oid, institute_class_oid, due_amount, remarks, status, created_by, created_on)

    	VALUES(uuid(), fees_oid, v_json->>'headCode', v_json->>'feeHeadOid', studentCur.institute_session_oid, studentCur.institute_oid, studentCur.institute_class_oid, dueAmount, v_json->>'remarks', 'Active', v_json->>'createdBy', CURRENT_TIMESTAMP);
    		
		-- Debit
		SELECT JSON_BUILD_OBJECT(
		    'ledgerOid', debit_ledger_oid,
		    'journalType', 'AcademicFee',
		    'journalEntryNo', 1,
		    'referenceNo', studentCur.student_id,
		    'remarks', v_json->>'remarks',
		    'debitedAmount', dueAmount,
		    'creditedAmount', 0,
		    'subLedgerOid', (select oid from sub_ledger where ledger_key = 'AcademicFee' and reference_oid = studentCur.oid),
		    'referenceType', 'Student',
		    'referenceOid', studentCur.oid
		) INTO debit;

		-- Credit
		SELECT JSON_BUILD_OBJECT(
		    'ledgerOid', credit_ledger_oid,
		    'journalType', 'AcademicFee',
		    'journalEntryNo', 1,
		    'referenceNo', studentCur.student_id,
		    'remarks', v_json->>'remarks',
		    'debitedAmount', 0,
		    'creditedAmount', dueAmount
		    --'subLedgerOid', v_expense.sub_ledger_oid
		) INTO credit;
		
		SELECT json_build_array(debit, credit) INTO journal_list;
		
		SELECT JSON_BUILD_OBJECT(
		    'journalType', 'AcademicFee',
		    'journalManner', 'Auto',
		    'remarks', v_json->>'remarks',
		    'amount', dueAmount,
		    'referenceNo', studentCur.student_id,
		    'instituteOid', p_institute_oid,
		    'createdBy', v_json->>'createdBy',
		    'journalList', journal_list
		) INTO v_journal_summary;

		
		perform post_journal(v_journal_summary);
		
		

  	end loop;
  END;
$insert_due_fees_with_history$ LANGUAGE plpgsql;

-- select * from schoolerp.insert_due_fees_with_history('{"instituteClassOid":"SCHOOL-ERP-Institute-Class-7","createdBy":"Kamal Parvez","sessionOid":"SCHOOL-ERP-Institute-Session-2022","headCode":"TUITION_FEE","instituteOid":"SCHOOL-ERP-Demo-School-001","feeHeadOid":"schoolerp-fee-head-oid-tuition-fee","remarks":"Test Purpose","status":"Due"}','SCHOOL-ERP-Demo-School-001','SCHOOL-ERP-Institute-Class-7','SCHOOL-ERP-Institute-Session-2022','10000.00'::numeric);















--DROP FUNCTION IF EXISTS fees_collection_journal(varchar(128));
CREATE OR REPLACE FUNCTION schoolerp.fees_collection_journal(p_oid varchar(128))
RETURNS void AS $fees_collection_journal$
    DECLARE
    	v_fees_collection			record;
    	v_fees_collection_detail		record;
        v_debit_ledger_oid                  	varchar(128);  
        v_credit_ledger_oid                  	varchar(128);  
        v_debit_sub_ledger_oid                  varchar(128);  
        v_credit_sub_ledger_oid                 varchar(128);  
        debit                           	json;
        credit                          	json;
        journal_list                    	json;
        v_journal_summary               	json;
        sortOrder		               	int4;
    	
    	
    BEGIN
    
        SELECT * INTO v_fees_collection FROM schoolerp.fees_collection WHERE oid = p_oid;
        SELECT ledger_oid INTO v_credit_ledger_oid FROM ledger_setting WHERE institute_oid = v_fees_collection.institute_oid and ledger_key = 'AcademicFee';
        SELECT oid INTO v_credit_sub_ledger_oid FROM sub_ledger WHERE institute_oid = v_fees_collection.institute_oid and ledger_key = 'AcademicFee' 
        and reference_oid = (select oid from student where student_id = v_fees_collection.student_id);
        SELECT ledger_oid INTO v_debit_ledger_oid FROM ledger_setting WHERE institute_oid = v_fees_collection.institute_oid and ledger_key = 'Cash';
        
        sortOrder := 0;
	
	for v_fees_collection_detail in (SELECT  * FROM schoolerp.fees_collection_detail where fees_collection_oid = p_oid) loop 
		
		IF coalesce(v_fees_collection_detail.paid_amount::float, 0) > 0 THEN 
			sortOrder := sortOrder + 1;
			
			-- Debit
			SELECT JSON_BUILD_OBJECT(
			    'ledgerOid', v_debit_ledger_oid,
			    'journalType', 'FeesCollection',
			    'journalEntryNo', sortOrder,
			    'referenceNo', v_fees_collection.oid,
			    'remarks', v_fees_collection.remarks,
			    'debitedAmount', v_fees_collection_detail.paid_amount,
			    'creditedAmount', 0
			    --'subLedgerOid', v_debit_sub_ledger_oid,
			    --'referenceType', 'Student',
			    --'referenceOid', (select oid from student where student_id = v_fees_collection.student_id)
			) INTO debit;

			-- Credit
			SELECT JSON_BUILD_OBJECT(
			    'ledgerOid', v_credit_ledger_oid,
			    'journalType', 'FeesCollection',
			    'journalEntryNo', sortOrder,
			    'referenceNo', v_fees_collection.oid,
			    'remarks', v_fees_collection.remarks,
			    'debitedAmount', 0,
			    'creditedAmount', v_fees_collection_detail.paid_amount,
			    'subLedgerOid', v_credit_sub_ledger_oid,
			    'referenceType', 'Student',
			    'referenceOid', (select oid from student where student_id = v_fees_collection.student_id)
			) INTO credit;
			
			SELECT json_build_array(debit, credit) INTO journal_list;
			
			SELECT JSON_BUILD_OBJECT(
			    'journalType', 'FeesCollection',
			    'journalManner', 'Auto',
			    'remarks', v_fees_collection.remarks,
			    'amount', v_fees_collection_detail.paid_amount,
			    'referenceNo', v_fees_collection.oid,
			    'instituteOid', v_fees_collection.institute_oid,
			    'createdBy', v_fees_collection.created_by,
			    'journalList', journal_list
			) INTO v_journal_summary;

			
			perform post_journal(v_journal_summary);
		END IF;

	end loop;
	
	
    END;
$fees_collection_journal$ LANGUAGE plpgsql;
-- SELECT fees_collection_journal('10');
