
import { ResponseHeader } from "../../header/response-header";
import { GetEducationSessionListResponseBody } from "./get-education-session-list-response-body";

export class GetEducationSessionListResponse {
  header: ResponseHeader;
  body: GetEducationSessionListResponseBody;
}