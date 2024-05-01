import { Header } from "src/app/common/request/base-request";
import { GetSubjectListByInstituteTypeRequestBody } from "./get-subject-list-by-institute-type-request-body";

export class GetSubjectListByInstituteTypeRequest {
  header: Header = new Header();
  body: GetSubjectListByInstituteTypeRequestBody;
}
