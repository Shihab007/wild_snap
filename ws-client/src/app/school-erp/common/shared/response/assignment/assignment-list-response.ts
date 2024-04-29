import { ResponseHeader } from "../../header/response-header";
import { AssignmentListResponseBody } from "./assignment-list-response-body";


export class AssignmentListResponse {
  header: ResponseHeader = new ResponseHeader();
  body: AssignmentListResponseBody;
}
