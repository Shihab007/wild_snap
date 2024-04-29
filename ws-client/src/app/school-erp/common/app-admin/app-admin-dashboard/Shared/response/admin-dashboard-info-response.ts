import { ResponseHeader } from "src/app/school-erp/common/shared/header/response-header";
import { AdminDashboardInfoResponseBody } from "./admin-dashboard-info-response-body";

export class AdminDashboardInfoResponse {
  header: ResponseHeader;
  body: AdminDashboardInfoResponseBody;
}
