import { RequestHeader } from "../../header/request-header";
import { GetEducationSessionRequestBody } from "./get-education-session-request-body";

export class GetEducationSessionRequest {
  header: RequestHeader;
  body: GetEducationSessionRequestBody;
}