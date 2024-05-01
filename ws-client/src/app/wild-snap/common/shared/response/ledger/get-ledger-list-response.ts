import { ResponseHeader } from "../../header/response-header";
import { GetLedgerListResponseBody } from "./get-ledger-list-response-body";

export class GetLedgerListResponse {
  header: ResponseHeader;
  body: GetLedgerListResponseBody;
}
