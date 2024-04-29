import { ResponseHeader } from "../../header/response-header";
import { ContactListResponseBody } from "./contact-list-response-body";

export class ContactListResponse {
  header: ResponseHeader;
  body: ContactListResponseBody;
}
