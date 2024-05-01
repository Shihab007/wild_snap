import { ClassList } from "../../../model/class/class-list";
import { ExamList } from "../../../model/exam/exam-list";

export class InstituteDashboardInfoResponseBody {
  oid: string;
  nameEn: string;
  nameBn: string;
  maleStudentsCount: number;
  femaleStudentsCount: number;
  studentsPresentCount: number;
  studentsAbsentCount: number;
  allStudentsPresentCount: number;
  allStudentsAbsentCount: number;
  studentsPassCount: number;
  studentsFailCount: number;

  examList: ExamList[];
  classList: ClassList[]
}
