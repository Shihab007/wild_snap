import { ResponseHeader } from "../../header/response-header";
import { FeeSettingList } from "../../model/fee-setting/fee-setting-list";
import { GetFeeSettingListResponseBody } from "./get-fee-setting-list-response-body";

export class GetFeeSettingListReponse {
  header: ResponseHeader;
  body: GetFeeSettingListResponseBody;
}
