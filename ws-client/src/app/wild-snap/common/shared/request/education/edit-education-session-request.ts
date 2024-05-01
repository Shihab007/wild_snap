import { RequestHeader } from "../../header/request-header";
import { EditEducationSessionRequestBody } from "./edit-education-session-request-body";

export class EditEducationSessionRequest {
  header: RequestHeader;
  body: EditEducationSessionRequestBody;
}