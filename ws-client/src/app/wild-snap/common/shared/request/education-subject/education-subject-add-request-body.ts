import { EducationTypeList } from "../../model/education-subject/education-type-list";

export class EducationSubjectAddRequestBody {

  nameEn: string;
  nameBn: string;
  subjectCode: string;
  subjectType: string;
  educationMediumOid: string;
  educationSystemOid: string;
  educationCurriculumOid: string;
  educationSessionOid: string;
  totalMarks: number;
  mcqMarks: number;
  writtenMarks: number;
  practicalMarks: number;
  vivaMarks: number;

  educationTypeList: EducationTypeList[] = [];

}
