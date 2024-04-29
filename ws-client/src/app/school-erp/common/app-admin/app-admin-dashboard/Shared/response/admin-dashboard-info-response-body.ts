import { InstituteInfo } from "../Model/institute-info";

export class AdminDashboardInfoResponseBody {
  totalUser: string;
  totalStudent: string;
  totalTeacher: string;
  totalGuardian: string;
  totalSms: string;

  topTenInstitute: InstituteInfo[];
  lessTenInstitute: InstituteInfo[];
}
