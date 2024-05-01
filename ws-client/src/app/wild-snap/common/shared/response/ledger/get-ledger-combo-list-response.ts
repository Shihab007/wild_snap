import { ResponseHeader } from "../../header/response-header";
import { GetLedgerComboListResponseBody } from "./get-ledger-combo-list-response-body";

export class GetLedgerComboListResponse {
  header: ResponseHeader;
  body: GetLedgerComboListResponseBody;
}
