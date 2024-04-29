import { ResponseHeader } from "../../header/response-header";
import { SendOtpResponseBody } from "./send-otp-response-body";

export class SendOtpResponse {
  header: ResponseHeader;
  body: SendOtpResponseBody;
}
