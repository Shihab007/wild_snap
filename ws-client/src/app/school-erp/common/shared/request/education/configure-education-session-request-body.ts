
import { EducationSessionInstitute } from "../../model/education/education-session-institute";

export class ConfigureEducationSessionRequestBody {
  instituteOid: String;
  educationSessionOid: String;
  applicableInstituteType: String;
  createdBy: String;
  instituteList: EducationSessionInstitute[];

}