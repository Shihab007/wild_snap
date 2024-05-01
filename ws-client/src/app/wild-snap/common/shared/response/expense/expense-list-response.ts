import { ResponseHeader } from "../../header/response-header";
import { ExpenseListResponseBody } from "./expense-list-response-body";

export class ExpenseListResponse {

  header: ResponseHeader;
  body: ExpenseListResponseBody;

}
