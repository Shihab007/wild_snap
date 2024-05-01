import { RequestHeader } from "../../header/request-header";
import { SaveEducationSessionRequestBody } from "./save-education-session-request-body";

export class SaveEducationSessionRequest {
  header: RequestHeader;
  body: SaveEducationSessionRequestBody;
}