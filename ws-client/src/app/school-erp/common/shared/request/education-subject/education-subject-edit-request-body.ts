import { EducationSubjectMark } from "../../model/education-subject/education-subject-mark";

export class EducationSubjectEditRequestBody {
  oid: string;
  nameEn: string;
  nameBn: string;
  subjectCode: string;
  subjectType: string;
  status: string;
  educationSystemOid: string;
  educationSystemNameEn: string;
  educationSystemNameBn: string;
  educationCurriculumOid: string;
  educationCurriculumNameEn: string;
  educationCurriculumNameBn: string;

  totalMarks: number;
  mcqMarks: number;
  writtenMarks: number;
  practicalMarks: number;
  vivaMarks: number;

}
