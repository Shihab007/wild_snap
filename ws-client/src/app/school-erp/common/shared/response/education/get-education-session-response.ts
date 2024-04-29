
import { ResponseHeader } from "../../header/response-header";
import { GetEducationSessionResponseBody } from "./get-education-session-response-body";

export class GetEducationSessionResponse {
  header: ResponseHeader;
  body: GetEducationSessionResponseBody;
}