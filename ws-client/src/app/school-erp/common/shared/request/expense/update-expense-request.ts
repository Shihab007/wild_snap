import { RequestHeader } from "../../header/request-header";
import { UpdateExpenseRequestBody } from "./update-expense-request-body";

export class UpdateExpenseRequest {
  header: RequestHeader;
  body: UpdateExpenseRequestBody;
}
