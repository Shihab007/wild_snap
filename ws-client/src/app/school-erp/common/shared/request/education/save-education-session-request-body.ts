import { StringLiteral } from "typescript";
import { EducationTypeSession } from "../../model/education/education-type-session";

export class SaveEducationSessionRequestBody {
  oid: String;
  nameEn: String;
  nameBn: String;
  previousSessionOid: String;

  status: String;
  educationSystemOid: String;
  educationCurriculumOid: String;
  educationTypeSessionList: EducationTypeSession[] = [];
}