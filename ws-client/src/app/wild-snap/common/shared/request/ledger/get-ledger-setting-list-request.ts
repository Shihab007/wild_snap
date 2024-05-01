import { RequestHeader } from "../../header/request-header";
import { GetLedgerSettingListRequestBody } from "./get-ledger-setting-list-request-body";

export class GetLedgerSettingListRequest {
  header: RequestHeader;
  body: GetLedgerSettingListRequestBody;
}
