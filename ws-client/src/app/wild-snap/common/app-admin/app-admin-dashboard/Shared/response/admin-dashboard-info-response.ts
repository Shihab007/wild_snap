import { ResponseHeader } from "src/app/wild-snap/common/shared/header/response-header";
import { AdminDashboardInfoResponseBody } from "./admin-dashboard-info-response-body";

export class AdminDashboardInfoResponse {
  header: ResponseHeader;
  body: AdminDashboardInfoResponseBody;
}
