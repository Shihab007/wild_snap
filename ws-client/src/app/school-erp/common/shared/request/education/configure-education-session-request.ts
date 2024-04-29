import { RequestHeader } from "../../header/request-header";
import { ConfigureEducationSessionRequestBody } from "./configure-education-session-request-body";

export class ConfigureEducationSessionRequest {
  header: RequestHeader;
  body: ConfigureEducationSessionRequestBody;
}