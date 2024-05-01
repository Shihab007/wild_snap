import { RequestHeader } from "../../header/request-header";
import { GetExpenseRequestBody } from "./get-expense-request-body";

export class GetExpenseRequest {
  header: RequestHeader;
  body: GetExpenseRequestBody;
}
