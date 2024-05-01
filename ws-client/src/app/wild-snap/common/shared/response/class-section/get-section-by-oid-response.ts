import { ResponseHeader } from "../../header/response-header";
import { GetSectionByOidResponseBody } from "./get-section-by-oid-response-body";

export class GetSectionByOidResponse {
  
  header: ResponseHeader;
  body: GetSectionByOidResponseBody;
}
