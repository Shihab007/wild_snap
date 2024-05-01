import { EducationTypeSession } from "../../model/education/education-type-session";

export class EditEducationSessionRequestBody {
  oid: String;
  nameEn: String;
  nameBn: String;

  status: String;
  educationSystemOid: String;
  educationCurriculumOid: String;
  educationTypeSessionList: EducationTypeSession[];
}