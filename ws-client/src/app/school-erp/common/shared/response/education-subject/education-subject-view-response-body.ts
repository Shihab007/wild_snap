import { EducationSubjectMark } from "../../model/education-subject/education-subject-mark";

export class EducationSubjectViewResponseBody {
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

  subjectMark: EducationSubjectMark = new EducationSubjectMark();

}
