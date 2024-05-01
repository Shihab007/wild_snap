import { ResponseHeader } from "../../header/response-header";
import { RejectSmsServiceResponseBody } from "./reject-sms-service-response-body";

export class RejectSmsServiceResponse {
  header: ResponseHeader;
  body: RejectSmsServiceResponseBody;
}
