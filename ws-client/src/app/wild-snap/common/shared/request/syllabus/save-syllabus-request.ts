import { SaveSyllabusRequestBody } from "./save-syllabus-request-body";
import { RequestHeader } from "../../header/request-header";
export class SaveSyllabusRequest {
  header: RequestHeader;
  body: SaveSyllabusRequestBody;
}
