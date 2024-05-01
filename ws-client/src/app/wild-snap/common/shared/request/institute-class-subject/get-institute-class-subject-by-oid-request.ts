import { GetInstituteClassSubjectByOidRequestBody } from "./get-institute-class-subject-by-oid-request-body";
import { Header } from "../../../../../common/request/base-request";

export class GetInstituteClassSubjectByOidRequest {
  header: Header = new Header();
  body: GetInstituteClassSubjectByOidRequestBody;
}
