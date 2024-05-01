import { ResponseHeader } from "../../header/response-header";
import { GetLedgerSettingListResponseBody } from "./get-ledger-settng-list-response-body";

export class GetLedgerSettingListResponse {
  header: ResponseHeader;
  body: GetLedgerSettingListResponseBody;
}
