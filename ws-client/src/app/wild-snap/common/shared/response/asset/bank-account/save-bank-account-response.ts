import { ResponseHeader } from "../../../header/response-header";
import { SaveBankAccountResponseBody } from "./save-bank-account-response-body";

export class SaveBankAccountResponse {
  header: ResponseHeader;
  body: SaveBankAccountResponseBody;
}
