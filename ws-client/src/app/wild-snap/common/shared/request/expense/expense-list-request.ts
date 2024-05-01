import { RequestHeader } from "../../header/request-header";
import { ExpenseListRequestBody } from "./expense-list-request-body";

export class ExpenseListRequest {
  header: RequestHeader;
  body: ExpenseListRequestBody;
}
