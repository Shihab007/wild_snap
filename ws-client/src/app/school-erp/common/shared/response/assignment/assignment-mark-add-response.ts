import { ResponseHeader } from "../../header/response-header";
import { AssignmentMarkAddResponseBody } from "./assignment-mark-add-response-body";

export class AssignmentMarkAddResponse {
  header: ResponseHeader;
  body: AssignmentMarkAddResponseBody;
}
