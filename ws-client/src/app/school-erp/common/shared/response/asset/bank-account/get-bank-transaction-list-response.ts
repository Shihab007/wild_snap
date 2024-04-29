import { ResponseHeader } from "../../../header/response-header";
import { GetBankTransactionListResponseBody } from "./get-bank-transaction-list-response-body";

export class GetBankTransactionListResponse {
  header: ResponseHeader;
  body: GetBankTransactionListResponseBody;
}
