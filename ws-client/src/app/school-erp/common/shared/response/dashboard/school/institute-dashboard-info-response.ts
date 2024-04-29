import { ResponseHeader } from "../../../header/response-header";
import { InstituteDashboardInfoResponseBody } from "./institute-dashboard-info-response-body";

export class InstituteDashboardInfoResponse {
  header: ResponseHeader;
  body: InstituteDashboardInfoResponseBody;
}
