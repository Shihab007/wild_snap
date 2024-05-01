import { Header } from "src/app/common/request/base-request";
import { CheckExistingEducationRequestBody } from "./check-existing-education-request-body";

export class CheckExistingEducationRequest {
  header: Header = new Header();
  body: CheckExistingEducationRequestBody;
}
