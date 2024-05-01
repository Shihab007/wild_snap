
import { ResponseHeader } from "../../header/response-header";
import { ConfigureEducationSessionResponseBody } from "./configure-education-session-response-body";

export class ConfigureEducationSessionResponse {
  header: ResponseHeader;
  body: ConfigureEducationSessionResponseBody;
}