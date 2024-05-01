import { ResponseHeader } from "../../header/response-header";
import { UpdateAssignmentResponseBody } from "./update-assignment-response-body";

export class UpdateAssignmentResponse {
  header: ResponseHeader = new ResponseHeader();
  body: UpdateAssignmentResponseBody;
}
