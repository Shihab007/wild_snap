import { Header } from "src/app/common/request/base-request";
import { CommonChangePasswordRequestBody } from "./common-change-password-request-body";

export class CommonChangePasswordRequest {
  header: Header = new Header();
  body: CommonChangePasswordRequestBody;
}
