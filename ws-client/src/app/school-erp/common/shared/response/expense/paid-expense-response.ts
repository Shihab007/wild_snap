import { PaidExpenseResponseBody } from "./paid-expense-response-body";
import { ResponseHeader } from "../../header/response-header";

export class PaidExpenseResponse {
  header: ResponseHeader;
  body: PaidExpenseResponseBody;
}
