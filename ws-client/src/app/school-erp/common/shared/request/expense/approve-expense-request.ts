import { RequestHeader } from "../../header/request-header";
import { ApproveExpenseRequestBody } from "./approve-expense-request-body";

export class ApproveExpenseRequest {
  header: RequestHeader;
  body: ApproveExpenseRequestBody;
}
