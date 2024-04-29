import { ResponseHeader } from "../../header/response-header";
import { SaveSyllabusResponseBody } from "./save-syllabus-response-body";
export class SaveSyllabusResponse {
  header: ResponseHeader = new ResponseHeader();
  body: SaveSyllabusResponseBody;
}
