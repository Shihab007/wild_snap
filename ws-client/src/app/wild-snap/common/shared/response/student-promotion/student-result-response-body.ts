import { StudentPromotionInfo } from "../../model/student-promotion/student-promotion-info";
import { StudentResult } from "../../model/student-promotion/student-result";

export class StudentResultResponseBody {
  studentPromotionInfo: StudentPromotionInfo;

  studentList: StudentResult[] = [];
}
