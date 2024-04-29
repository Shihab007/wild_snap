import { ResponseHeader } from "../../../header/response-header";
import { SaveBankTransactionResponseBody } from "./save-bank-transaction-response-body";

export class SaveBankTransactionResponse {
  header: ResponseHeader;
  body: SaveBankTransactionResponseBody;
}
