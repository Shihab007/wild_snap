import { ResponseHeader } from "../../header/response-header";
import { AssignmentResponseBody } from "./assignment-response-body";

export class AssignmentResponse {
  header: ResponseHeader = new ResponseHeader();
  body: AssignmentResponseBody;
}
