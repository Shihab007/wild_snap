import { RequestHeader } from "../../../header/request-header";
import { GuardianDashboardInfoRequestBody } from "./guardian-dashboard-info-request-body";

export class GuardianDashboardInfoRequest {
  header: RequestHeader;
  body: GuardianDashboardInfoRequestBody;
}
