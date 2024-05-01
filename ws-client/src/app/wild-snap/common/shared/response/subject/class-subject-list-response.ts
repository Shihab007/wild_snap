import { ResponseHeader } from "../../header/response-header";
import { ClassSubjectListResponseBody } from "./class-subject-list-response-body";

export class ClassSubjectListResponse {
  header: ResponseHeader;
  body: ClassSubjectListResponseBody;
}
