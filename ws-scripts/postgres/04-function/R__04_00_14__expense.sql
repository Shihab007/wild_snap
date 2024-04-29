--DROP FUNCTION IF EXISTS expense_journal(varchar(128));
CREATE OR REPLACE FUNCTION expense_journal(p_oid varchar(128), p_created_by varchar(128))
RETURNS void AS $expense_journal$
    DECLARE
    	v_expense				record;
    	v_expense_detail			record;
        debit                           	json;
        credit                          	json;
        journal_list                    	json;
        v_journal_summary               	json;
        sortOrder		               	int4;
    	
    	
    BEGIN
    
        SELECT * INTO v_expense FROM expense WHERE oid = p_oid;
        
        sortOrder := 0;
	
	for v_expense_detail in (SELECT  * FROM schoolerp.expense_detail where expense_oid = p_oid) loop 
		sortOrder := sortOrder + 1;
		
		-- Debit
		SELECT JSON_BUILD_OBJECT(
		    'ledgerOid', v_expense_detail.ledger_oid,
		    'journalType', 'Expense',
		    'journalEntryNo', sortOrder,
		    'referenceNo', v_expense.expense_no,
		    'remarks', v_expense_detail.remarks,
		    'debitedAmount', v_expense_detail.expense_amount,
		    'creditedAmount', 0
		    --'subLedgerOid', v_expense.sub_ledger_oid,
		    --'referenceType', 'Student',
		    --'referenceOid', v_student.oid
		) INTO debit;

		-- Credit
		SELECT JSON_BUILD_OBJECT(
		    'ledgerOid', v_expense.ledger_oid,
		    'journalType', 'Expense',
		    'journalEntryNo', sortOrder,
		    'referenceNo', v_expense.expense_no,
		    'remarks', v_expense.remarks,
		    'debitedAmount', 0,
		    'creditedAmount', v_expense_detail.expense_amount,
		    'subLedgerOid', v_expense.sub_ledger_oid
		) INTO credit;
		
		SELECT json_build_array(debit, credit) INTO journal_list;
		
		SELECT JSON_BUILD_OBJECT(
		    'journalType', 'Expense',
		    'journalManner', 'Auto',
		    'remarks', v_expense.remarks,
		    'amount', v_expense.expense_amount,
		    'referenceNo', v_expense.expense_no,
		    'instituteOid', v_expense.institute_oid,
		    'createdBy', p_created_by,
		    'journalList', journal_list
		) INTO v_journal_summary;

		
		perform post_journal(v_journal_summary);

	end loop;
	
	
    END;
$expense_journal$ LANGUAGE plpgsql;
-- SELECT expense_journal('10', '10');


--DROP FUNCTION IF EXISTS update_expense_journal(varchar(128));
CREATE OR REPLACE FUNCTION update_expense_journal(p_oid varchar(128), p_created_by varchar(128))
RETURNS void AS $update_expense_journal$
    DECLARE
    	v_expense				record;
    	v_expense_detail			record;
        debit                           	json;
        credit                          	json;
        journal_list                    	json;
        v_journal_summary               	json;
        sortOrder		               	int4;
    	
    	
    BEGIN
    
        SELECT * INTO v_expense FROM expense WHERE oid = p_oid;
        
        sortOrder := 0;
	
	for v_expense_detail in (SELECT  * FROM schoolerp.expense_detail where expense_oid = p_oid) loop 
		sortOrder := sortOrder + 1;
		
		-- Debit
		SELECT JSON_BUILD_OBJECT(
		    'ledgerOid', v_expense_detail.ledger_oid,
		    'journalType', 'Expense',
		    'journalEntryNo', sortOrder,
		    'referenceNo', v_expense.expense_no,
		    'remarks', v_expense_detail.remarks,
		    'debitedAmount', v_expense_detail.expense_amount,
		    'creditedAmount', 0
		    --'subLedgerOid', v_expense.sub_ledger_oid,
		    --'referenceType', 'Student',
		    --'referenceOid', v_student.oid
		) INTO debit;

		-- Credit
		SELECT JSON_BUILD_OBJECT(
		    'ledgerOid', v_expense.ledger_oid,
		    'journalType', 'Expense',
		    'journalEntryNo', sortOrder,
		    'referenceNo', v_expense.expense_no,
		    'remarks', v_expense.remarks,
		    'debitedAmount', 0,
		    'creditedAmount', v_expense_detail.expense_amount,
		    'subLedgerOid', v_expense.sub_ledger_oid
		) INTO credit;
		
		SELECT json_build_array(debit, credit) INTO journal_list;
		
		SELECT JSON_BUILD_OBJECT(
		    'journalType', 'Expense',
		    'journalManner', 'Auto',
		    'remarks', v_expense.remarks,
		    'amount', v_expense.expense_amount,
		    'referenceNo', v_expense.expense_no,
		    'instituteOid', v_expense.institute_oid,
		    'createdBy', p_created_by,
		    'journalList', journal_list
		) INTO v_journal_summary;

		
		perform post_journal(v_journal_summary);

	end loop;
	
	
    END;
$update_expense_journal$ LANGUAGE plpgsql;
-- SELECT update_expense_journal('10', '10');
