import { ResponseHeader } from "../../header/response-header";
import { CommonChangePasswordResponseBody } from "./common-change-password-response-body";

export class CommonChangePasswordResponse {
  header: ResponseHeader;
  body: CommonChangePasswordResponseBody;
}
