import { RequestHeader } from "src/app/wild-snap/common/shared/header/request-header";
import { AdminDashboardInfoRequestBody } from "./admin-dashboard-info-request-body";

export class AdminDashboardInfoRequest {
  header: RequestHeader;
  body: AdminDashboardInfoRequestBody;
}
