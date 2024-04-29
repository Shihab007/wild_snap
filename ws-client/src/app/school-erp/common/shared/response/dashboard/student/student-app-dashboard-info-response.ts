import { StudentAppDashboardInfoResponseBody } from "./student-app-dashboard-info-response-body";
import { ResponseHeader } from "../../../header/response-header";

export class StudentAppDashboardInfoResponse {
  header: ResponseHeader;
  body: StudentAppDashboardInfoResponseBody;
}
