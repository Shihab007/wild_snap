import { RequestHeader } from "src/app/school-erp/common/shared/header/request-header";
import { InstituteDashboardAllInfoRequestBody } from "./institute-dashboard-all-info-request-body";

export class InstituteDashboardAllInfoRequest {
  header: RequestHeader;
  body: InstituteDashboardAllInfoRequestBody;
}
