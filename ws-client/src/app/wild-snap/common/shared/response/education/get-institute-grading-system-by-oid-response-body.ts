import { InstituteGradingSystemDetail } from "../../model/education/institute-grading-system-detail";

export class GetInstituteGradingSystemByOidResponseBody {
  oid: string;
  nameEn: string;
  nameBn: string;
  gradePointScale: number;
  sortOrder: number;
  status: string;
  instituteOid: string;
  instituteTypeOid: string;
  educationSystemOid: string;
  createdBy: string;


  instituteGradingSystemDetail: InstituteGradingSystemDetail[];
}
