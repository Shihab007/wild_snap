import { RequestHeader } from "../../header/request-header";
import { ContactByOidRequestBody } from "./contact-by-oid-request-body";

export class ContactByOidRequest {
  header: RequestHeader;
  body: ContactByOidRequestBody;
}
