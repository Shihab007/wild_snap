import { SubjectMark } from "../../model/exam-mark-sheet/subject-mark";
import { TermInfo } from "../../model/exam-mark-sheet/term-info";

export class CreateExamResultMarkSheetResponseBody {

  nameEn: string;
  nameBn: string;
  roll: string;
  gpa: string;
  grade: string;
  assessment: string;
  instituteClassNameEn: string;
  instituteClassNameBn: string;
  instituteClassSectionNameEn: string;
  instituteClassSectionNameBn: string;
  instituteClassGroupNameEn: string;
  instituteClassGroupNameBn: string;
  subjectMarkList: SubjectMark[] = [];
  termInfo: TermInfo;
}
