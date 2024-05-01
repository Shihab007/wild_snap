import { ResponseHeader } from "../../header/response-header";
import { VerifyOtpResponseBody } from "./verify-otp-response-body";

export class VerifyOtpResponse {
  header: ResponseHeader;
  body: VerifyOtpResponseBody;
}
