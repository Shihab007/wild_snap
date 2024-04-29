import { ResponseHeader } from "../../../header/response-header";
import { LedgerGroupListResponseBody } from "./ledger-group-list-response-body";

export class LedgerGroupListResponse {
  header: ResponseHeader;
  body: LedgerGroupListResponseBody;
}
