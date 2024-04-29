import { FeeSettingModel } from "../../model/fee/fee-setting-model";

export class FeeSettingDetailResponseBody {

  instituteOid: string;
  instituteClassOid: string;
  headCodes: string[];
  feeSettingDetail: FeeSettingModel[];
}
