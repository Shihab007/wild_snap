import { Header } from "src/app/common/request/base-request";
import { FeeSettingEntity } from "../../model/fee-setting/fee-setting-entity";

export class CreateFeeSettingRequest {
  header: Header = new Header();
  body: FeeSettingEntity;
}
