import { FeesCollection } from "../../../model/fees/fees-collection/fees-collection";
import { FeesCollectionDetails } from "../../../model/fees/fees-collection/fees-collection-details";

export class GetFeesCollectionByInstituteAndClassResponseBody {
  feesCollectionList: FeesCollection[];
  totalFeesCollection: FeesCollection[];
}
