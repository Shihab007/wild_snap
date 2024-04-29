import { FeeHeadGroupMapping } from "../../model/fee/fee-head-group-mapping";

export class FeeHeadGroupMappingAddRequestBody {
  instituteOid: string;
  sessionOid: string;
  instituteClassOid: string;
  groupCode: string;
  groupOid: string;
  nameEn: string;
  nameBn: string;
  comments: string;
  createdBy: string;
  updatedBy: string;

  feesSettingDetail: FeeHeadGroupMapping[];
}
