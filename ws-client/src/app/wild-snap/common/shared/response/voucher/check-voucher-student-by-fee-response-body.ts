import { FeeDueModel } from "../../model/fee-due/fee-due-model";

export class CheckVoucherStudentByFeeResponseBody {

  hasDueFee: boolean;
  studentVoucher: FeeDueModel;
}
