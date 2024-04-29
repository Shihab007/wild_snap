import { ResponseHeader } from "../../../header/response-header";
import { GetSubLedgerListResponseBody } from "./get-sub-ledger-list-response-body";

export class GetSubLedgerListResponse {
  header: ResponseHeader;
  body: GetSubLedgerListResponseBody;
}
