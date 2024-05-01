import { ResponseHeader } from "../../header/response-header";
import { RejectExpenseResponseBody } from "./reject-expense-response-body";

export class RejectExpenseResponse {
  header: ResponseHeader;
  body: RejectExpenseResponseBody;
}
