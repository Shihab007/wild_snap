import { Header } from "../../../../../common/request/base-request";
import { GetInstituteClassSubjectListRequestBody } from "./get-institute-class-subject-list-request-body";

export class GetInstituteClassSubjectListRequest {
  header: Header = new Header();
  body: GetInstituteClassSubjectListRequestBody;
}
