import { ResponseHeader } from "../../header/response-header";
import { FeeSettingByFeeCodeResponseBody } from "./fee-setting-by-fee-code-response-body";

export class FeeSettingByFeeCodeResponse {
  header: ResponseHeader;
  body: FeeSettingByFeeCodeResponseBody;
}
