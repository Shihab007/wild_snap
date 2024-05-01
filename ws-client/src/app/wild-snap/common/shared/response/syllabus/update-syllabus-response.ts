import { ResponseHeader } from "../../header/response-header";
import { UpdateSyllabusResponseBody } from "./update-syllabus-response-body";

export class UpdateSyllabusResponse {
  header: ResponseHeader;
  body: UpdateSyllabusResponseBody;
}
