import { RequestHeader } from "../../header/request-header";
import { RejectExpenseRequestBody } from "./reject-expense-request-body";

export class RejectExpenseRequest {
  header: RequestHeader;
  body: RejectExpenseRequestBody;
}
