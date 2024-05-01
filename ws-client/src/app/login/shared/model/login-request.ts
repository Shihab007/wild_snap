import { LoginRequestBody } from "./login-request-body";
import { LoginRequestHeader } from "./login-request-header";

export class LoginRequest {

  header: LoginRequestHeader;
  body: LoginRequestBody;
}
