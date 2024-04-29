import { EducationTypeSession } from "./education-type-session";

export class SaveEducationSession {
  oid: String;
  nameEn: String;
  nameBn: String;

  status: String;
  educationSystemOid: String;
  educationCurriculumOid: String;
  educationTypeSessionList: EducationTypeSession[];

}
