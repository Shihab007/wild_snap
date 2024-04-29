import { Header } from "src/app/common/request/base-request";
import { GetEducationClassListBySessionRequestBody } from "./get-education-class-list-by-session-request-body";

export class GetEducationClassListBySessionRequest {
  header: Header = new Header();
  body: GetEducationClassListBySessionRequestBody;
}
