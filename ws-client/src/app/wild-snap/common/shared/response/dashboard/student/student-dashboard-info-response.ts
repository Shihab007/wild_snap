import { ResponseHeader } from "../../../header/response-header";
import { StudentDashboardInfoResponseBody } from "./student-dashboard-info-response-body";

export class StudentDashboardInfoResponse {
  header: ResponseHeader;
  body: StudentDashboardInfoResponseBody;
}
