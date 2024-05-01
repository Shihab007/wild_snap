import { ResponseHeader } from "../../header/response-header";
import { GetInstituteClassTermListResponseBody } from "./get-institute-class-term-list-response-body";

export class GetInstituteClassTermListResponse {

  header: ResponseHeader = new ResponseHeader();
  body: GetInstituteClassTermListResponseBody;

}
