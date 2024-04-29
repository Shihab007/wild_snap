import { ResponseHeader } from "../../header/response-header";
import { ResetPasswordResponseBody } from "./reset-password-response-body";

export class ResetPasswordResponse {
  header: ResponseHeader;
  body: ResetPasswordResponseBody;
}
