import { ResponseHeader } from "../../header/response-header";
import { GetInstituteSubjectListResponseBody } from "./get-institute-subject-list-response-body";

export class GetInstituteSubjectListResponse {
  header: ResponseHeader;
  body: GetInstituteSubjectListResponseBody;
}
