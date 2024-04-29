--DROP FUNCTION IF EXISTS voucher_payment_journal(varchar(128));
CREATE OR REPLACE FUNCTION voucher_payment_journal(p_oid varchar(128))
RETURNS void AS $voucher_payment_journal$
    DECLARE
    	v_payment				record;
    	v_payment_detail			record;
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
    
        SELECT * INTO v_payment FROM payment WHERE oid = p_oid;
        SELECT oid INTO v_student_oid FROM student WHERE student_id = v_payment.student_id;
              
    	SELECT ledger_oid INTO v_credit_ledger_oid FROM ledger_setting WHERE institute_oid = v_payment.institute_oid and ledger_key = 'AcademicFee';
    	SELECT oid INTO v_credit_sub_ledger_oid from sub_ledger WHERE ledger_key = 'AcademicFee' and reference_oid = v_student_oid;
    	
    	IF v_payment.payment_mode = 'Bank' THEN 
    		SELECT ledger_oid INTO v_debit_ledger_oid FROM ledger_setting WHERE institute_oid = v_payment.institute_oid and ledger_key = 'CashInBank';
	END IF;
	
	IF v_payment.payment_mode = 'Cash' THEN 
    		SELECT ledger_oid INTO v_debit_ledger_oid FROM ledger_setting WHERE institute_oid = v_payment.institute_oid and ledger_key = 'Cash';
	END IF;
        
        sortOrder := 1;
	
	for v_payment_detail in (SELECT pd.fee_amount, pd.paid_amount, pd.voucher_oid, pd.payment_oid, pd.institute_oid, v.voucher_no, v.fee_due_oid 
	FROM schoolerp.payment_detail pd, schoolerp.voucher v where 1 = 1 and pd.voucher_oid = v.oid and pd.payment_oid = p_oid) loop 
		--sortOrder := sortOrder + 1;
		
		UPDATE schoolerp.voucher SET due_amount = due_amount - v_payment_detail.paid_amount, 
		paid_amount = paid_amount + v_payment_detail.paid_amount WHERE oid = v_payment_detail.voucher_oid;
		
		UPDATE schoolerp.fee_due SET due_amount = due_amount - v_payment_detail.paid_amount, 
		paid_amount = paid_amount + v_payment_detail.paid_amount WHERE oid = v_payment_detail.fee_due_oid;
		
		If (select due_amount from schoolerp.voucher WHERE oid = v_payment_detail.voucher_oid) = 0 THEN
			UPDATE schoolerp.voucher SET status = 'Paid' WHERE oid = v_payment_detail.voucher_oid;
        	END IF;
        	
		If (select due_amount from schoolerp.fee_due WHERE oid = v_payment_detail.fee_due_oid) = 0 THEN
			UPDATE schoolerp.fee_due SET status = 'Paid' WHERE oid = v_payment_detail.fee_due_oid;
        	END IF;
		
		-- Debit
		SELECT JSON_BUILD_OBJECT(
		    'ledgerOid', v_debit_ledger_oid,
		    'journalType', 'VoucherPayment',
		    'journalEntryNo', sortOrder,
		    'referenceNo', v_payment_detail.voucher_no,
		    'remarks', v_payment.remarks,
		    'debitedAmount', v_payment_detail.paid_amount,
		    'creditedAmount', 0,
		    'subLedgerOid', v_debit_sub_ledger_oid,
		    'referenceType', null,
		    'referenceOid', null
		) INTO debit;

		-- Credit
		SELECT JSON_BUILD_OBJECT(
		    'ledgerOid', v_credit_ledger_oid,
		    'journalType', 'VoucherPayment',
		    'journalEntryNo', sortOrder,
		    'referenceNo', v_payment_detail.voucher_no,
		    'remarks', v_payment.remarks,
		    'debitedAmount', 0,
		    'creditedAmount', v_payment_detail.paid_amount,
		    'subLedgerOid', v_credit_sub_ledger_oid,
		    'referenceType', 'Student',
		    'referenceOid', v_student_oid
		) INTO credit;
		
		SELECT json_build_array(debit, credit) INTO journal_list;
		
		SELECT JSON_BUILD_OBJECT(
		    'journalType', 'VoucherPayment',
		    'journalManner', 'Auto',
		    'remarks', v_payment.remarks,
		    'amount', v_payment_detail.paid_amount,
		    'referenceNo', v_payment.payment_id,
		    'instituteOid', v_payment.institute_oid,
		    'createdBy', v_payment.created_by,
		    'journalList', journal_list
		) INTO v_journal_summary;

		
		perform post_journal(v_journal_summary);

	end loop;
	
	UPDATE schoolerp.payment SET debit_ledger_oid = v_debit_ledger_oid, debit_sub_ledger_oid = v_debit_sub_ledger_oid, credit_ledger_oid = v_credit_ledger_oid, 
	credit_sub_ledger_oid = v_credit_sub_ledger_oid WHERE oid = p_oid;
	
	
    END;
$voucher_payment_journal$ LANGUAGE plpgsql;
-- SELECT voucher_payment_journal('10', '10');
