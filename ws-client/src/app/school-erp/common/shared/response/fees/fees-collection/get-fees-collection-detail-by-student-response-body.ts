import { Student } from "../../../model/student/student";
import { FeesCollection } from "../../../model/fees/fees-collection/fees-collection";
import { FeesCollectionDetails } from "../../../model/fees/fees-collection/fees-collection-details";

export class GetFeesCollectionDetailByStudentResponseBody {
  studentInfo: Student = new Student();
  feesCollection: FeesCollection = new FeesCollection();
  feesCollectionDetailList: FeesCollectionDetails[] = [];
}
