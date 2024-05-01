import { Header } from "src/app/common/request/base-request";
import { GetFeeSettingListRequestBody } from "./get-fee-setting-list-request-body";

export class GetFeeSettingListRequest {
  header: Header = new Header();
  body: GetFeeSettingListRequestBody;
}
