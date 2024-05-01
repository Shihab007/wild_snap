import { AssignmentListRequestBody } from "./assignment-list-request-body";
import { Header } from "src/app/common/request/base-request";

export class AssignmentListRequest {
  header: Header = new Header();
  body: AssignmentListRequestBody;

}
