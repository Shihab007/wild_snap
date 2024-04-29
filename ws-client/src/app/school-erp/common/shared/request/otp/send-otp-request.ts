import { Header } from "src/app/common/request/base-request";
import { SendOtpRequestBody } from "./send-otp-request-body";

export class SendOtpRequest {
  header: Header = new Header();
  body: SendOtpRequestBody;
}
