import { ResponseHeader } from "../../header/response-header";
import { SyllabusListResponseBody } from "./syllabus-list-response-body";
export class SyllabusListResponse {
  header: ResponseHeader = new ResponseHeader();
  body: SyllabusListResponseBody;
}
