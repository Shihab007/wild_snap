import { ExamList } from "../../../model/exam/exam-list";

export class GuardianDashboardInfoResponseBody {
  oid: string;
  nameEn: string;
  nameBn: string;
  studentsPresentCount: number;
  studentsAbsentCount: number;

  examList: ExamList[];
}
