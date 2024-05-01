import { Header } from "src/app/common/request/base-request";
import { UpdateProfileByLoginIdRequestBody } from "./update-profile-by-login-id-request-body";

export class UpdateProfileByLoginIdRequest {
  header: Header = new Header();
  body: UpdateProfileByLoginIdRequestBody;
}
