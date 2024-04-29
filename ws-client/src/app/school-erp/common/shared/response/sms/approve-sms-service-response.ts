import { ResponseHeader } from "../../header/response-header";
import { ApproveSmsServiceResponseBody } from "./approve-sms-service-response-body";

export class ApproveSmsServiceResponse {
  header: ResponseHeader;
  body: ApproveSmsServiceResponseBody;
}

