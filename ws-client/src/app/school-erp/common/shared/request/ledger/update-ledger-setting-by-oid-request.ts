import { RequestHeader } from "../../header/request-header";
import { UpdateLedgerSettingByOidRequestBody } from "./update-ledger-setting-by-oid-request-body";

export class UpdateLedgerSettingByOidRequest {
  header: RequestHeader;
  body: UpdateLedgerSettingByOidRequestBody;
}
