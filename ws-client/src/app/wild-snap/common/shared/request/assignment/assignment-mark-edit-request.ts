import { RequestHeader } from "../../header/request-header";
import { AssignmentMarkEditRequestBody } from "./assignment-mark-edit-request-body";

export class AssignmentMarkEditRequest {
  header: RequestHeader;
  body: AssignmentMarkEditRequestBody;
}
