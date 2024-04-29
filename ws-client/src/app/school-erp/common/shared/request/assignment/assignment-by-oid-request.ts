import { Header } from "src/app/common/request/base-request";
import { AssignmentByOidRequestBody } from "./assignment-by-oid-request-body";

export class AssignmentByOidRequest {
  header: Header = new Header();
  body: AssignmentByOidRequestBody;

}
