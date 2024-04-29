import { ResponseHeader } from "../../header/response-header";
import { GetExpenseResponseBody } from "./get-expense-response-body";

export class GetExpenseResponse {

  header: ResponseHeader;
  body: GetExpenseResponseBody;

}
