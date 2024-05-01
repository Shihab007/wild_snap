import { ResponseHeader } from "../../header/response-header";
import { GetLedgerSettingByOidResponseBody } from "./get-ledger-setting-by-oid-response-body";

export class GetLedgerSettingByOidResponse {
  header: ResponseHeader;
  body: GetLedgerSettingByOidResponseBody;
}
