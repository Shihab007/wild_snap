import { Header } from "src/app/common/request/base-request";
import { GetInstituteSubjectListRequestBody } from "./get-institute-subject-list-request-body";

export class GetInstituteSubjectListRequest {
  header: Header = new Header();
  body: GetInstituteSubjectListRequestBody;
}
