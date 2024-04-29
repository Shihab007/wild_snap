import { ResponseHeader } from "../../header/response-header";
import { FeeSettingDetailResponseBody } from "./fee-setting-detail-response-body";

export class FeeSettingDetailResponse {
  header: ResponseHeader;
  body: FeeSettingDetailResponseBody;
}
