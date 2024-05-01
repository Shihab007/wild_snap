import { Header } from "src/app/common/request/base-request";
import { SaveBankTransactionRequestBody } from "./save-bank-transaction-request-body";

export class SaveBankTransactionRequest {
  header: Header = new Header();
  body: SaveBankTransactionRequestBody;
}

