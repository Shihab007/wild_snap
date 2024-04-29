import { RequestHeader } from "../../header/request-header";
import { GetSmsFeatureByOidRequestBody } from "./get-sms-feature-by-oid-request-body";

export class GetSmsFeatureByOidRequest {
  header: RequestHeader;
  body: GetSmsFeatureByOidRequestBody;
}
