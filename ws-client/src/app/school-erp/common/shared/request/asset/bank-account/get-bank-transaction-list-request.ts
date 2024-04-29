import { Header } from "src/app/common/request/base-request";
import { GetBankTransactionListRequestBody } from "./get-bank-transaction-list-request-body";

export class GetBankTransactionListRequest {
  header: Header = new Header();
  body: GetBankTransactionListRequestBody;
}
