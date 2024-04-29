import { Header } from "src/app/common/request/base-request";
import { GetInstituteClassTermListRequestBody } from "./get-institute-class-term-list-request-body";

export class GetInstituteClassTermListRequest {
  header: Header = new Header();
  body: GetInstituteClassTermListRequestBody;
}
