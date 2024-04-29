import { Header } from "src/app/common/request/base-request";
import { ApproveSmsServiceRequestBody } from "./approve-sms-service-request-body";

export class ApproveSmsServiceRequest {
  header: Header = new Header();
  body: ApproveSmsServiceRequestBody;
}
