import { FinalSubjectMark } from "../../model/exam-mark-sheet/final-subject-mark";
import { FinalTermInfo } from "../../model/exam-mark-sheet/final-term-info";
import { SubjectName } from "../../model/exam-mark-sheet/subject-name";

export class CreateFinalExamResultMarkSheetResponseBody {

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

  subjectList: SubjectName[] = [];
  termList: FinalTermInfo[] = [];

}