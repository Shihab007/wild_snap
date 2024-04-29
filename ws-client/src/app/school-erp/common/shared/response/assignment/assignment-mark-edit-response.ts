import { ResponseHeader } from "../../header/response-header";
import { AssignmentEditResponseBody } from "./assignment-mark-edit-response-body";

export class AssignmentEditResponse {
  header: ResponseHeader;
  body: AssignmentEditResponseBody;
}
