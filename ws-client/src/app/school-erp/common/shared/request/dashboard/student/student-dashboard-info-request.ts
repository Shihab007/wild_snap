import { RequestHeader } from "../../../header/request-header";
import { StudentDashboardInfoRequestBody } from "./student-dashboard-info-request-body";

export class StudentDashboardInfoRequest {
  header: RequestHeader;
  body: StudentDashboardInfoRequestBody;
}
