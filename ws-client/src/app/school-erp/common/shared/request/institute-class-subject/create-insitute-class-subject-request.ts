import { Header } from "src/app/common/request/base-request";
import { CreateInsituteClassSubjectRequestBody } from "./create-insitute-class-subject-request-body";

export class CreateInsituteClassSubjectRequest {
  header: Header = new Header();
  body: CreateInsituteClassSubjectRequestBody;
}
