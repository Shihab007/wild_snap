import { StudentAppDashboardInfoRequestBody } from "./student-app-dashboard-info-request-body";
import { RequestHeader } from "../../../header/request-header";

export class StudentAppDashboardInfoRequest {
  header: RequestHeader;
  body: StudentAppDashboardInfoRequestBody;
}
