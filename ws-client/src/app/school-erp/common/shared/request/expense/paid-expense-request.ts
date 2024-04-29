import { PaidExpenseRequestBody } from "./paid-expense-request-body";
import { RequestHeader } from "../../header/request-header";

export class PaidExpenseRequest {
  header: RequestHeader;
  body: PaidExpenseRequestBody;
}
