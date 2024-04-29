import { RequestHeader } from "../../../header/request-header";
import { InstituteDashboardInfoRequestBody } from "./institute-dashboard-info-request-body";

export class InstituteDashboardInfoRequest {
  header: RequestHeader;
  body: InstituteDashboardInfoRequestBody;
}
