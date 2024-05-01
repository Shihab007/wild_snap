
export class UpdateExpenseRequestBody {
  oid: string;
  expenseNo: string;
  expenseDate: Date;
  expenseMakeBy: string;
  paymentMode: string;
  expenseAmount: number;
  paidAmount: number;
  dueAmount: number;
  expenseDocJson: string;
  status: string;
  remarks: string;
  instituteOid: string;
  financialPeriodOid: string;
}
