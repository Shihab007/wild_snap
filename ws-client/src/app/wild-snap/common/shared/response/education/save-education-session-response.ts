
import { ResponseHeader } from "../../header/response-header";
import { SaveEducationSessionResponseBody } from "./save-education-session-response-body";

export class SaveEducationSessionResponse {
  header: ResponseHeader;
  body: SaveEducationSessionResponseBody;
}