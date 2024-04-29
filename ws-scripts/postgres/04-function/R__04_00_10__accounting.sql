

DROP FUNCTION IF EXISTS post_journal(p_data json);
CREATE OR REPLACE FUNCTION post_journal(p_data json)
RETURNS VOID AS $post_journal$
    DECLARE
    	v_institute				record;	
        v_journal               		json;
        v_journal_summary_oid           	varchar(128);
        v_financial_period_oid          	varchar(128);
    BEGIN

        SELECT * INTO v_institute FROM institute WHERE oid = p_data->>'instituteOid';
	SELECT concat('SCHOOL-ERP-', v_institute.eiin_number, '-Jou-Sum-', uuid()) INTO v_journal_summary_oid;
        SELECT oid INTO v_financial_period_oid FROM financial_period WHERE institute_oid = p_data->>'instituteOid' and status = 'Opened';
        
	INSERT INTO journal_summary(oid, journal_entry_date, journal_type, journal_manner, amount, reference_no, remarks, 
	financial_period_oid, institute_oid, created_by) VALUES(v_journal_summary_oid, current_date, p_data->>'journalType', p_data->>'journalManner', coalesce((p_data->>'amount')::float, 0), 
	p_data->>'referenceNo', p_data->>'remarks', v_financial_period_oid, p_data->>'instituteOid', p_data->>'createdBy');	

        FOR v_journal IN SELECT * FROM json_array_elements((p_data->>'journalList')::json) loop
        
        	insert into journal (oid, journal_entry_date, journal_entry_no, journal_type, reference_no, remarks, debited_amount, credited_amount, ledger_oid, ledger_code,
        	ledger_balance, sub_ledger_oid, sub_ledger_code, sub_ledger_balance, reference_type, reference_oid, journal_summary_oid, financial_period_oid, institute_oid, created_by)
	        values (concat('SCHOOL-ERP-', v_institute.eiin_number, '-Jounal-', uuid()), current_date, (v_journal->>'journalEntryNo')::int4, coalesce((v_journal->>'journalType'), null), 
	        coalesce((v_journal->>'referenceNo'), null), v_journal->>'remarks', coalesce((v_journal->>'debitedAmount')::float, 0), coalesce((v_journal->>'creditedAmount')::float, 0),
	        v_journal->>'ledgerOid', (select ledger_code from ledger where oid = v_journal->>'ledgerOid'),
	        (
	        	select ( CASE WHEN ledger_type = 'Debit' and coalesce((v_journal->>'debitedAmount')::float, 0) > coalesce((v_journal->>'creditedAmount')::float, 0)
	        	THEN (ledger_balance + coalesce((v_journal->>'debitedAmount')::float, 0))
	        	WHEN ledger_type = 'Debit' and coalesce((v_journal->>'debitedAmount')::float, 0) < coalesce((v_journal->>'creditedAmount')::float, 0)
	        	THEN (ledger_balance - coalesce((v_journal->>'creditedAmount')::float, 0))
	        	WHEN ledger_type = 'Credit' and coalesce((v_journal->>'debitedAmount')::float, 0) > coalesce((v_journal->>'creditedAmount')::float, 0)
	        	THEN (ledger_balance - coalesce((v_journal->>'debitedAmount')::float, 0))
	        	WHEN ledger_type = 'Credit' and coalesce((v_journal->>'debitedAmount')::float, 0) < coalesce((v_journal->>'creditedAmount')::float, 0)
	        	THEN (ledger_balance + coalesce((v_journal->>'creditedAmount')::float, 0))
	        	ELSE 0 END )
				from ledger where oid = v_journal->>'ledgerOid'
	        ),
	        v_journal->>'subLedgerOid', (select sub_ledger_code from sub_ledger where oid = v_journal->>'subLedgerOid'),
	        (
	        	select ( CASE WHEN sub_ledger_type = 'Debit' and coalesce((v_journal->>'debitedAmount')::float, 0) > coalesce((v_journal->>'creditedAmount')::float, 0)
	        	THEN (sub_ledger_balance + coalesce((v_journal->>'debitedAmount')::float, 0))
	        	WHEN sub_ledger_type = 'Debit' and coalesce((v_journal->>'debitedAmount')::float, 0) < coalesce((v_journal->>'creditedAmount')::float, 0)
	        	THEN (sub_ledger_balance - coalesce((v_journal->>'creditedAmount')::float, 0))
	        	WHEN sub_ledger_type = 'Credit' and coalesce((v_journal->>'debitedAmount')::float, 0) > coalesce((v_journal->>'creditedAmount')::float, 0)
	        	THEN (sub_ledger_balance - coalesce((v_journal->>'debitedAmount')::float, 0))
	        	WHEN sub_ledger_type = 'Credit' and coalesce((v_journal->>'debitedAmount')::float, 0) < coalesce((v_journal->>'creditedAmount')::float, 0)
	        	THEN (sub_ledger_balance + coalesce((v_journal->>'creditedAmount')::float, 0))
	        	ELSE 0 END )
				from sub_ledger where oid = v_journal->>'subLedgerOid'
	        ),
	        v_journal->>'referenceType', v_journal->>'referenceOid', v_journal_summary_oid, v_financial_period_oid, p_data->>'instituteOid', p_data->>'createdBy');

	       	update ledger
	       	set ledger_balance = (
	       		CASE WHEN ledger_type = 'Debit' and coalesce((v_journal->>'debitedAmount')::float, 0) > coalesce((v_journal->>'creditedAmount')::float, 0)
	        	THEN (ledger_balance + coalesce((v_journal->>'debitedAmount')::float, 0))
	        	WHEN ledger_type = 'Debit' and coalesce((v_journal->>'debitedAmount')::float, 0) < coalesce((v_journal->>'creditedAmount')::float, 0)
	        	THEN (ledger_balance - coalesce((v_journal->>'creditedAmount')::float, 0))
	        	WHEN ledger_type = 'Credit' and coalesce((v_journal->>'debitedAmount')::float, 0) > coalesce((v_journal->>'creditedAmount')::float, 0)
	        	THEN (ledger_balance - coalesce((v_journal->>'debitedAmount')::float, 0))
	        	WHEN ledger_type = 'Credit' and coalesce((v_journal->>'debitedAmount')::float, 0) < coalesce((v_journal->>'creditedAmount')::float, 0)
	        	THEN (ledger_balance + coalesce((v_journal->>'creditedAmount')::float, 0))
	        	ELSE 0 END
	       	)
        	where oid = v_journal->>'ledgerOid';

	       	update sub_ledger
	       	set sub_ledger_balance = (
	       		CASE WHEN sub_ledger_type = 'Debit' and coalesce((v_journal->>'debitedAmount')::float, 0) > coalesce((v_journal->>'creditedAmount')::float, 0)
	        	THEN (sub_ledger_balance + coalesce((v_journal->>'debitedAmount')::float, 0))
	        	WHEN sub_ledger_type = 'Debit' and coalesce((v_journal->>'debitedAmount')::float, 0) < coalesce((v_journal->>'creditedAmount')::float, 0)
	        	THEN (sub_ledger_balance - coalesce((v_journal->>'creditedAmount')::float, 0))
	        	WHEN sub_ledger_type = 'Credit' and coalesce((v_journal->>'debitedAmount')::float, 0) > coalesce((v_journal->>'creditedAmount')::float, 0)
	        	THEN (sub_ledger_balance - coalesce((v_journal->>'debitedAmount')::float, 0))
	        	WHEN sub_ledger_type = 'Credit' and coalesce((v_journal->>'debitedAmount')::float, 0) < coalesce((v_journal->>'creditedAmount')::float, 0)
	        	THEN (sub_ledger_balance + coalesce((v_journal->>'creditedAmount')::float, 0))
	        	ELSE 0 END
	       	)
        	where oid = v_journal->>'subLedgerOid';
        END LOOP;
    END;
$post_journal$ language plpgsql;
