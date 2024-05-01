
export class CreateExpenseRequestBody {
  expenseNo: string;
  expenseDate: Date;
  expenseMakeBy: string;
  expenseMakeType: string;
  paymentMode: string;
  expenseAmount: number;
  paidAmount: number;
  dueAmount: number;
  expenseDocJson: string;
  status: string;
  remarks: string;
  ledgerOid: string;
  subLedgerOid: string;
  instituteOid: string;
  createdBy: string;

}
