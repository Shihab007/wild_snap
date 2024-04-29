import { Header } from "src/app/common/request/base-request";
import { SchoolGuardianEditRequestBody } from "./school-guardian-edit-request-body";

export class SchoolGuardianEditRequest {
  header: Header = new Header();
  body: SchoolGuardianEditRequestBody;
}
