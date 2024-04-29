import { RequestHeader } from "../../header/request-header";
import { GetLedgerSettingByOidRequestBody } from "./get-ledger-setting-by-oid-request-body";

export class GetLedgerSettingByOidRequest {
  header: RequestHeader;
  body: GetLedgerSettingByOidRequestBody;
}
