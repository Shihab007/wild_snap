import { Header } from "src/app/common/request/base-request";
import { VerifyOtpRequestBody } from "./verify-otp-request-body";

export class VerifyOtpRequest {
  header: Header = new Header();
  body: VerifyOtpRequestBody;
}
