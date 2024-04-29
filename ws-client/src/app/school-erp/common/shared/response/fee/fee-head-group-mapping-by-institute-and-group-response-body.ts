import { FeeHeadGroupMapping } from "../../model/fee/fee-head-group-mapping";

export class FeeHeadGroupMappingByInstituteAndGroupResponseBody {
  instituteOid: string;
  groupCode: string;

  feeHeadGroupMappingList: FeeHeadGroupMapping[];
}
