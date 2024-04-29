import { ResponseHeader } from "../../header/response-header";
import { GetInstituteSmsServiceListResponseBody } from "./get-institute-sms-service-list-response-body";
import { GetSmsServiceListResponseBody } from "./get-sms-service-list-response-body";

export class GetInstituteSmsServiceListResponse {
  header: ResponseHeader;
  body: GetInstituteSmsServiceListResponseBody;
}
