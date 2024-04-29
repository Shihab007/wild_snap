import { ExamResultByStudent } from "../../model/exam-result/exam-result-by-student";

export class ExamResultByStudentResponseBody {

  nameEn: string;
  nameBn: string;
  rollNumber: string;
  fatherNameEn: string;
  fatherNameBn: string;
  motherNameEn: string;
  motherNameBn: string;
  dateOfBirth: string;
  examEn: string;
  examBn: string;
  sessionEn: string;
  sessionBn: string;
  versionEn: string;
  versionBn: string;
  shiftEn: string;
  shiftBn: string;
  sectionEn: string;
  sectionBn: string;
  instituteEn: string;
  instituteBn: string;
  email: string;
  address: string;
  contact: string;
  instituteClassEn: string;
  instituteClassBn: string;
  instituteClassGroupEn: string;
  instituteClassGroupBn: string;
  totalGradePoint: number;
  resultMarksList: ExamResultByStudent[] = [];

}
