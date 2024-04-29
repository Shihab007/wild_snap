import { Header } from "src/app/common/request/base-request";
import { ResetPasswordRequestBody } from "./reset-password-request-body";

export class ResetPasswordRequest {
  header: Header = new Header();
  body: ResetPasswordRequestBody;
}
