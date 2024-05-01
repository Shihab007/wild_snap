import { ResponseHeader } from "../../header/response-header";
import { UpdateProfileByLoginIdResponseBody } from "./update-profile-by-login-id-response-body";

export class UpdateProfileByLoginIdResponse {
  header: ResponseHeader;
  body: UpdateProfileByLoginIdResponseBody;
}
