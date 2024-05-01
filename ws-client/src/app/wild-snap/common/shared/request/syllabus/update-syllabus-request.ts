import { RequestHeader } from "../../header/request-header";
import { UpdateSyllabusRequestBody } from "./update-syllabus-request-body";

export class UpdateSyllabusRequest {
  header: RequestHeader;
  body: UpdateSyllabusRequestBody;
}
