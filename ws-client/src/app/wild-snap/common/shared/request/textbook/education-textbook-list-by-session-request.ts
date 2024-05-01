import { Header } from "src/app/common/request/base-request";
import { EducationTextbookListBySessionRequestBody } from "./education-textbook-list-by-session-request-body";

export class EducationTextbookListBySessionRequest {
  header: Header = new Header();
  body: EducationTextbookListBySessionRequestBody;
}
