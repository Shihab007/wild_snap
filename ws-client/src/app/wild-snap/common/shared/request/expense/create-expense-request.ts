import { RequestHeader } from "../../header/request-header";
import { CreateExpenseRequestBody } from "./create-expense-request-body";

export class CreateExpenseRequest {
  header: RequestHeader;
  body: CreateExpenseRequestBody;
}
