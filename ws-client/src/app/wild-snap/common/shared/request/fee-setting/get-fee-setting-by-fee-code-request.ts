import { Header } from "src/app/common/request/base-request";
import { GetFeeSettingByFeeCodeRequestBody } from "./get-fee-setting-by-fee-code-request-body";

export class GetFeeSettingByFeeCodeRequest {
  header: Header = new Header();
  body: GetFeeSettingByFeeCodeRequestBody;
}
