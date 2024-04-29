import { ResponseHeader } from "../../header/response-header";
import { ApproveExpenseResponseBody } from "./approve-expense-response-body";

export class ApproveExpenseResponse {
  header: ResponseHeader;
  body: ApproveExpenseResponseBody;
}
