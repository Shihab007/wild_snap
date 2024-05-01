import { ResponseHeader } from "../../header/response-header";
import { GetProfileByLoginIdResponseBody } from "./get-profile-by-login-id-response-body";

export class GetProfileByLoginIdResponse {
  header: ResponseHeader;
  body: GetProfileByLoginIdResponseBody;
}
