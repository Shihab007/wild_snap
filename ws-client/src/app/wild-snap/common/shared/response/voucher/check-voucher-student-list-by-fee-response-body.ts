import { FeeDueModel } from "../../model/fee-due/fee-due-model";

export class CheckVoucherStudentListByFeeResponseBody {

  numberOfStudentForDueFee: number;
  numberOfStudentForWithOutDueFee: number;
  voucherStudentList: FeeDueModel[];
}
