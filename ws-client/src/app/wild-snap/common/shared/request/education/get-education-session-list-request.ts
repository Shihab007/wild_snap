import { RequestHeader } from "../../header/request-header";
import { GetEducationSessionListRequestBody } from "./get-education-session-list-request-body";

export class GetEducationSessionListRequest {
  header: RequestHeader;
  body: GetEducationSessionListRequestBody;
}