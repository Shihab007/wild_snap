import { StudentListByExamSubject } from "../../model/exam-result/student-list-by-exam-subject";
import { StudentListByExamTextbook } from "../../model/exam-result/student-list-by-examtextbook";

export class SaveExamResultRequestBody {


  examOid: string;
  instituteSessionOid: string;
  instituteOid: string;
  examResultOid: string;
  instituteClassOid: string;
  instituteClassGroupOid: string;
  instituteClassSectionOid: string;
  instituteShiftOid: string;
  instituteVersionOid: string;
  gradingSystemOid: string;
  createdBy: string;
  textBookOid: string;
  totalMarks: number;
  obtainedMarks: number;
  writtenMarks: number;
  mcqMarks: number;
  labMarks: number;
  vivaMarks: number;
  educationSubjectOid: string;
  termOid: string;



  // resultMarkList: StudentListByExamTextbook[];
  sectionList: StudentListByExamTextbook[];
  resultMarkList: StudentListByExamSubject[];
}
