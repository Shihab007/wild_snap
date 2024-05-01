import { FeesCollection } from "../../../model/fees/fees-collection/fees-collection";

export class GetFeesCollectionHistoryByInstituteAndClassResponseBody {
  feesCollectionList: FeesCollection[]
  totalFeesCollection: FeesCollection = new FeesCollection();
}
