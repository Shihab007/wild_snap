import { ResponseHeader } from "../../header/response-header";
import { GetSmsFeatureListResponseBody } from "./get-sms-feature-list-response-body";

export class GetSmsFeatureListResponse {
  header: ResponseHeader;
  body: GetSmsFeatureListResponseBody;
}
