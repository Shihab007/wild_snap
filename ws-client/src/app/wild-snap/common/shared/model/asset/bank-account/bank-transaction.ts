export class BankTransaction {
  oid: string;
  bankTransactionNo: string;
  transactionDate: string;
  transactionNature: string;
  transactionType: string;
  bankAccountOid: string;
  chequeNo: string;
  amount: number;
  priviousBalance: number;
  currentBalance: number;
  remarks: string;
  referenceType: string;
  referenceOid: string;

  instituteOid: string;
  depositType: string;
  depositorBankOid: string;
  depositorAccountName: string;
  depositorAccountNo: string;
  depositorChequeNo: string;
  debitLedgerOid: string;
  debitSubLedgerOid: string;
  creditLedgerOid: string;
  creditSubLedgerOid: string;
  createdBy: string;
  updatedBy: string;


  bankAccountNameEn: string;
  bankAccountNameBn: string;
  bankAccountNo: string;

}
