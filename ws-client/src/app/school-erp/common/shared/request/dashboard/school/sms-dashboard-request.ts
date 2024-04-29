import { RequestHeader } from "../../../header/request-header";
import { SmsDashboardRequestBody } from "./sms-dashboard-request-body";

export class SmsDashboardRequest {
  header: RequestHeader;
  body: SmsDashboardRequestBody;
}
