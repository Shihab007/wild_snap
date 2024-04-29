import { ResponseHeader } from "../../header/response-header";
import { GetAssignmentByOidResponseBody } from "./get-assignment-by-oid-response-body";

export class GetAssignmentByOidResponse {
  header: ResponseHeader = new ResponseHeader();
  body: GetAssignmentByOidResponseBody = new GetAssignmentByOidResponseBody();
}
