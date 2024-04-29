import { RequestHeader } from "../../header/request-header";
import { GetSmsFeatureListRequestBody } from "./get-sms-feature-list-request-body";

export class GetSmsFeatureListRequest {
  header: RequestHeader;
  body: GetSmsFeatureListRequestBody;
}
