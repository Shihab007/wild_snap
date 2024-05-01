import { Header } from "src/app/common/request/base-request";
import { EducationTextbookCreateRequestBody } from "./education-textbook-create-request-body";

export class EducationTextbookCreateRequest {
  header: Header = new Header();
  body: EducationTextbookCreateRequestBody;
}
