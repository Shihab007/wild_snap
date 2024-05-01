import { EducationTypeList } from "./education-type-list";

export class EducationSessionByOid {
  oid: String;
  nameEn: String;
  nameBn: String;
  educationCurriculumOid: String;
  educationSystemOid: String;
  noOfInstitute: String;
  noOfSessionEnrolledInstitute: String;
  status: String;
  educationSystemNameEn: String;
  educationSystemNameBn: String;
  educationCurriculumNameEn: String;
  educationCurriculumNameBn: String;
  previousSession: String;
  nextSession: String;
  educationTypeList: EducationTypeList[] = [];
}
