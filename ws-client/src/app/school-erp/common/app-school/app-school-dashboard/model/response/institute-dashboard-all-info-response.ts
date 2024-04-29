import { ResponseHeader } from "src/app/school-erp/common/shared/header/response-header";
import { InstituteDashboardAllInfoResponseBody } from "./institute-dashboard-all-info-response-body";

export class InstituteDashboardAllInfoResponse {
  header: ResponseHeader;
  body: InstituteDashboardAllInfoResponseBody;
}
