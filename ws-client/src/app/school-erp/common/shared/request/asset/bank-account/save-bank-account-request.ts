import { Header } from "src/app/common/request/base-request";
import { SaveBankAccountRequestBody } from "./save-bank-account-request-body";

export class SaveBankAccountRequest {
  header: Header = new Header();
  body: SaveBankAccountRequestBody;
}

