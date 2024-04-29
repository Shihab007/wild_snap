import { ResponseHeader } from "../../../header/response-header";
import { LedgerSubGroupListResponseBody } from "./ledger-sub-group-list-response-body";

export class LedgerSubGroupListResponse {
  header: ResponseHeader;
  body: LedgerSubGroupListResponseBody;
}
