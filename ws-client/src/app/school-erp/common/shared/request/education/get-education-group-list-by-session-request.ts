import { Header } from "src/app/common/request/base-request";
import { GetEducationGroupListBySessionRequestBody } from "./get-education-group-list-by-session-request-body";

export class GetEducationGroupListBySessionRequest {
  header: Header = new Header();
  body: GetEducationGroupListBySessionRequestBody;
}
