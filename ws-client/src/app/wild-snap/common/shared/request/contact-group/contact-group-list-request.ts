import { RequestHeader } from "../../header/request-header";
import { ContactGroupListRequestBody } from "./contact-group-list-request-body";

export class ContactGroupListRequest {
  header: RequestHeader;
  body: ContactGroupListRequestBody;
}
