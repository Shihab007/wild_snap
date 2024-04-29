import { RequestHeader } from "../../header/request-header";
import { GetSmsServiceByOidRequestBody } from "./get-sms-service-by-oid-request-body";

export class GetSmsServiceByOidRequest {
  header: RequestHeader;
  body: GetSmsServiceByOidRequestBody;
}
