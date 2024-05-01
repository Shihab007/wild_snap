import { ResponseHeader } from "../../../header/response-header";
import { SmsDashboardResponseBody } from "./sms-dashboard-response-body";

export class SmsDashboardResponse {
  header: ResponseHeader;
  body: SmsDashboardResponseBody;
}
