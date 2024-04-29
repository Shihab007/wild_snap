
export class GetExpenseResponseBody {

  oid: string;
  expenseNo: string;
  expenseDate: Date;
  expenseMakeBy: string;
  expenseMakeByNameEn: string;
  expenseMakeByNameBn: string;
  paymentMode: string;
  expenseAmount: number;
  paidAmount: number;
  dueAmount: number;
  expenseDocJson: string;
  status: string;
  remarks: string;
  financialPeriodOid: string;
  instituteOid: string;

}
