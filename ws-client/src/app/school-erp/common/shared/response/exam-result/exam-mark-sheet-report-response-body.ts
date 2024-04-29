import { ExamMarkSheetReport } from "../../model/exam-result/exam-mark-sheet-report";

export class ExamMarkSheetReportResponseBody {

  nameEn: string;
  nameBn: string;
  rollNumber: string;
  fatherNameEn: string;
  fatherNameBn: string;
  motherNameEn: string;
  motherNameBn: string;
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
  totalGradePoint: number;
  resultMarksList: ExamMarkSheetReport[] = [];

}
