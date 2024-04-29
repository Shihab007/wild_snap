import { ResponseHeader } from "../../header/response-header";
import { CreateExpenseResponseBody } from "./create-expense-response-body";

export class CreateExpenseResponse {

  header: ResponseHeader;
  body: CreateExpenseResponseBody;

}
