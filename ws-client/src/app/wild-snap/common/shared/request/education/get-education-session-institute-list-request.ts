import { RequestHeader } from "../../header/request-header";
import { GetEducationSessionInstituteListRequestBody } from "./get-education-session-institute-list-request-body";
import { GetEducationSessionListRequestBody } from "./get-education-session-list-request-body";

export class GetEducationSessionInstituteListRequest {
  header: RequestHeader;
  body: GetEducationSessionInstituteListRequestBody;
}