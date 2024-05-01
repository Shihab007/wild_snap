import { Header } from "src/app/common/request/base-request";
import { RejectSmsServiceRequestBody } from "./reject-sms-service-request-body";

export class RejectSmsServiceRequest {
  header: Header = new Header();
  body: RejectSmsServiceRequestBody;
}
