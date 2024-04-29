import { ResponseHeader } from "../../../header/response-header";
import { UpdateBankAccountResponseBody } from "./update-bank-account-response-body";

export class UpdateBankAccountResponse {
  header: ResponseHeader;
  body: UpdateBankAccountResponseBody;
}
