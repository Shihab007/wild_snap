--DROP FUNCTION IF EXISTS asset_allocation_journal(varchar(128));
CREATE OR REPLACE FUNCTION asset_allocation_journal(p_oid varchar(128))
RETURNS void AS $asset_allocation_journal$
    DECLARE
    	v_asset_allocation			record;
        debit                           	json;
        credit                          	json;
        journal_list                    	json;
        v_journal_summary               	json; 
        v_debit_ledger_oid                  	varchar(128);  
        v_credit_ledger_oid                  	varchar(128);  
        v_debit_sub_ledger_oid                  varchar(128);  
        v_credit_sub_ledger_oid                 varchar(128);   	
    	
    BEGIN
    
        SELECT * INTO v_asset_allocation FROM asset_allocation WHERE oid = p_oid;
        SELECT ledger_oid INTO v_debit_ledger_oid FROM ledger_setting WHERE institute_oid = v_asset_allocation.institute_oid and ledger_key = 'Cash';
        
        SELECT ledger_oid INTO v_credit_ledger_oid FROM ledger_setting WHERE institute_oid = v_asset_allocation.institute_oid and ledger_key = 'CreditNote';
        SELECT oid INTO v_credit_sub_ledger_oid FROM sub_ledger WHERE institute_oid = v_asset_allocation.institute_oid and ledger_key = 'CreditNote' and reference_oid = v_asset_allocation.asset_holder_oid;
		
	-- Debit
	SELECT JSON_BUILD_OBJECT(
	    'ledgerOid', v_debit_ledger_oid,
	    'journalType', 'AssetAllocation',
	    'journalEntryNo', 1,
	    'referenceNo', v_asset_allocation.oid,
	    'remarks', v_asset_allocation.remarks,
	    'debitedAmount', v_asset_allocation.current_advance_amount,
	    'creditedAmount', 0
	    --'subLedgerOid', v_asset_allocation.sub_ledger_oid,
	    --'referenceType', 'Student',
	    --'referenceOid', v_student.oid
	) INTO debit;

	-- Credit
	SELECT JSON_BUILD_OBJECT(
	    'ledgerOid', v_credit_ledger_oid,
	    'journalType', 'AssetAllocation',
	    'journalEntryNo', 1,
	    'referenceNo', v_asset_allocation.oid,
	    'remarks', v_asset_allocation.remarks,
	    'debitedAmount', 0,
	    'creditedAmount', v_asset_allocation.current_advance_amount,
	    'subLedgerOid', v_credit_sub_ledger_oid,
	    'referenceType', 'People',
	    'referenceOid', v_asset_allocation.asset_holder_oid
	) INTO credit;
	
	SELECT json_build_array(debit, credit) INTO journal_list;
	
	SELECT JSON_BUILD_OBJECT(
	    'journalType', 'AssetAllocation',
	    'journalManner', 'Auto',
	    'remarks', v_asset_allocation.remarks,
	    'amount', v_asset_allocation.current_advance_amount,
	    'referenceNo', v_asset_allocation.oid,
	    'instituteOid', v_asset_allocation.institute_oid,
	    'createdBy', v_asset_allocation.created_by,
	    'journalList', journal_list
	) INTO v_journal_summary;

	
	perform post_journal(v_journal_summary);
	
	
    END;
$asset_allocation_journal$ LANGUAGE plpgsql;
-- SELECT asset_allocation_journal('10', '10');


--DROP FUNCTION IF EXISTS asset_income_journal(varchar(128));
CREATE OR REPLACE FUNCTION asset_income_journal(p_oid varchar(128))
RETURNS void AS $asset_income_journal$
    DECLARE
    	v_asset_income				record;
        debit                           	json;
        credit                          	json;
        journal_list                    	json;
        v_journal_summary               	json; 
        v_debit_ledger_oid                  	varchar(128);  
        v_credit_ledger_oid                  	varchar(128);  
        v_debit_sub_ledger_oid                  varchar(128);  
        v_credit_sub_ledger_oid                 varchar(128);   	
    	
    BEGIN
    
        SELECT * INTO v_asset_income FROM asset_income WHERE oid = p_oid;
        
        
        SELECT ledger_oid INTO v_debit_ledger_oid FROM ledger_setting WHERE institute_oid = v_asset_income.institute_oid and ledger_key = 'AccountReceivable';
        SELECT oid INTO v_debit_sub_ledger_oid FROM sub_ledger WHERE institute_oid = v_asset_income.institute_oid and ledger_key = 'AccountReceivable' and reference_oid = v_asset_income.asset_holder_oid;
        
        SELECT ledger_oid INTO v_credit_ledger_oid FROM ledger_setting WHERE institute_oid = v_asset_income.institute_oid and ledger_key = 'AssetRevenue';
		
	-- Debit
	SELECT JSON_BUILD_OBJECT(
	    'ledgerOid', v_debit_ledger_oid,
	    'journalType', 'AssetIncome',
	    'journalEntryNo', 1,
	    'referenceNo', v_asset_income.asset_income_id,
	    'remarks', v_asset_income.remarks,
	    'debitedAmount', v_asset_income.rent_amount,
	    'creditedAmount', 0,
	    'subLedgerOid', v_debit_sub_ledger_oid,
	    'referenceType', 'People',
	    'referenceOid', v_asset_income.asset_holder_oid
	) INTO debit;

	-- Credit
	SELECT JSON_BUILD_OBJECT(
	    'ledgerOid', v_credit_ledger_oid,
	    'journalType', 'AssetIncome',
	    'journalEntryNo', 1,
	    'referenceNo', v_asset_income.asset_income_id,
	    'remarks', v_asset_income.remarks,
	    'debitedAmount', 0,
	    'creditedAmount', v_asset_income.rent_amount
	    --'subLedgerOid', v_credit_sub_ledger_oid
	) INTO credit;
	
	SELECT json_build_array(debit, credit) INTO journal_list;
	
	SELECT JSON_BUILD_OBJECT(
	    'journalType', 'AssetIncome',
	    'journalManner', 'Auto',
	    'remarks', v_asset_income.remarks,
	    'amount', v_asset_income.rent_amount,
	    'referenceNo', v_asset_income.asset_income_id,
	    'instituteOid', v_asset_income.institute_oid,
	    'createdBy', v_asset_income.created_by,
	    'journalList', journal_list
	) INTO v_journal_summary;

	
	perform post_journal(v_journal_summary);
	
	
    END;
$asset_income_journal$ LANGUAGE plpgsql;
-- SELECT asset_income_journal('10', '10');



--DROP FUNCTION IF EXISTS income_collection_journal(varchar(128));
CREATE OR REPLACE FUNCTION income_collection_journal(p_oid varchar(128))
RETURNS void AS $income_collection_journal$
    DECLARE
    	v_income_collection			record;
    	v_income_collection_detail		record;
        v_debit_ledger_oid                  	varchar(128);  
        v_credit_ledger_oid                  	varchar(128);  
        v_debit_sub_ledger_oid                  varchar(128);  
        v_credit_sub_ledger_oid                 varchar(128);  
        debit                           	json;
        credit                          	json;
        journal_list                    	json;
        v_journal_summary               	json;
        sortOrder		               	int4;
        v_credit_note_ledger_oid                varchar(128);  
        v_credit_note_sub_ledger_oid            varchar(128); 
    	
    	
    BEGIN
    
        SELECT * INTO v_income_collection FROM schoolerp.income_collection WHERE oid = p_oid;
        
        SELECT ledger_oid INTO v_debit_ledger_oid FROM ledger_setting WHERE institute_oid = v_income_collection.institute_oid and ledger_key = 'Cash';       
        SELECT ledger_oid INTO v_credit_ledger_oid FROM ledger_setting WHERE institute_oid = v_income_collection.institute_oid and ledger_key = 'AccountReceivable';
        SELECT oid INTO v_credit_sub_ledger_oid FROM sub_ledger WHERE institute_oid = v_income_collection.institute_oid and ledger_key = 'AccountReceivable' 
        and reference_oid = v_income_collection.asset_holder_oid;        
        
        SELECT ledger_oid INTO v_credit_note_ledger_oid FROM ledger_setting WHERE institute_oid = v_income_collection.institute_oid and ledger_key = 'CreditNote';
        SELECT oid INTO v_credit_note_sub_ledger_oid FROM sub_ledger WHERE institute_oid = v_income_collection.institute_oid 
        and ledger_key = 'CreditNote' and reference_oid = v_income_collection.asset_holder_oid;
        
        sortOrder := 0;
	
	for v_income_collection_detail in (SELECT  * FROM schoolerp.income_collection_detail where income_collection_oid = p_oid) loop 
		sortOrder := sortOrder + 1;
		
		IF coalesce(v_income_collection_detail.received_amount::float, 0) > 0 THEN 
		
			-- Debit
			SELECT JSON_BUILD_OBJECT(
			    'ledgerOid', v_debit_ledger_oid,
			    'journalType', 'IncomeCollection',
			    'journalEntryNo', sortOrder,
			    'referenceNo', v_income_collection.income_collection_id,
			    'remarks', v_income_collection.remarks,
			    'debitedAmount', v_income_collection_detail.received_amount,
			    'creditedAmount', 0
			    --'subLedgerOid', v_debit_sub_ledger_oid,
			    --'referenceType', 'Student',
			    --'referenceOid', (select oid from student where student_id = v_income_collection.student_id)
			) INTO debit;

			-- Credit
			SELECT JSON_BUILD_OBJECT(
			    'ledgerOid', v_credit_ledger_oid,
			    'journalType', 'IncomeCollection',
			    'journalEntryNo', sortOrder,
			    'referenceNo', v_income_collection.income_collection_id,
			    'remarks', v_income_collection.remarks,
			    'debitedAmount', 0,
			    'creditedAmount', v_income_collection_detail.received_amount,
			    'subLedgerOid', v_credit_sub_ledger_oid,
			    'referenceType', 'People',
			    'referenceOid', v_income_collection.asset_holder_oid
			) INTO credit;
			
			SELECT json_build_array(debit, credit) INTO journal_list;
			
			SELECT JSON_BUILD_OBJECT(
			    'journalType', 'IncomeCollection',
			    'journalManner', 'Auto',
			    'remarks', v_income_collection.remarks,
			    'amount', v_income_collection_detail.received_amount,
			    'referenceNo', v_income_collection.income_collection_id,
			    'instituteOid', v_income_collection.institute_oid,
			    'createdBy', v_income_collection.created_by,
			    'journalList', journal_list
			) INTO v_journal_summary;

			
			perform post_journal(v_journal_summary);
		
		END IF;
		
		
		IF coalesce(v_income_collection_detail.adjustment_advance_amount::float, 0) > 0 THEN 
		
			-- Debit
			SELECT JSON_BUILD_OBJECT(
			    'ledgerOid', v_credit_note_ledger_oid,
			    'journalType', 'IncomeCollectionCreditNote',
			    'journalEntryNo', sortOrder,
			    'referenceNo', v_income_collection.income_collection_id,
			    'remarks', 'Adjustment People Advance Amount',
			    'debitedAmount', v_income_collection_detail.adjustment_advance_amount,
			    'creditedAmount', 0,
			    'subLedgerOid', v_credit_note_sub_ledger_oid,
			    'referenceType', 'People',
			    'referenceOid', v_income_collection.asset_holder_oid
			) INTO debit;

			-- Credit
			SELECT JSON_BUILD_OBJECT(
			    'ledgerOid', v_credit_ledger_oid,
			    'journalType', 'IncomeCollectionCreditNote',
			    'journalEntryNo', sortOrder,
			    'referenceNo', v_income_collection.income_collection_id,
			    'remarks', 'Adjustment People Advance Amount',
			    'debitedAmount', 0,
			    'creditedAmount', v_income_collection_detail.adjustment_advance_amount,
			    'subLedgerOid', v_credit_sub_ledger_oid,
			    'referenceType', 'People',
			    'referenceOid', v_income_collection.asset_holder_oid
			) INTO credit;
			
			SELECT json_build_array(debit, credit) INTO journal_list;
			
			SELECT JSON_BUILD_OBJECT(
			    'journalType', 'IncomeCollectionCreditNote',
			    'journalManner', 'Auto',
			    'remarks', 'Adjustment People Advance Amount',
			    'amount', v_income_collection_detail.adjustment_advance_amount,
			    'referenceNo', v_income_collection.income_collection_id,
			    'instituteOid', v_income_collection.institute_oid,
			    'createdBy', v_income_collection.created_by,
			    'journalList', journal_list
			) INTO v_journal_summary;

			
			perform post_journal(v_journal_summary);   
		
		END IF;

	end loop;
	
	
    END;
$income_collection_journal$ LANGUAGE plpgsql;
-- SELECT income_collection_journal('10');

