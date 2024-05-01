import { Header } from "src/app/common/request/base-request";
import { GetProfileByLoginIdRequestBody } from "./get-profile-by-login-id-request-body";

export class GetProfileByLoginIdRequest {
  header: Header = new Header();
  body: GetProfileByLoginIdRequestBody
}
