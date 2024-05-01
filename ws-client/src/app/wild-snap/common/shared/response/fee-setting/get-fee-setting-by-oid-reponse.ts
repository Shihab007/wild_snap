import { ResponseHeader } from "../../header/response-header";
import { FeeSettingEntity } from "../../model/fee-setting/fee-setting-entity";

export class GetFeeSettingByOidReponse {
  header: ResponseHeader;
  body: FeeSettingEntity;
}
