import { ResponseHeader } from "../../header/response-header";
import { SubjectResponseBody } from "./subject-response-body";

export class SubjectResponse {
  header: ResponseHeader;
  body: SubjectResponseBody;
}
