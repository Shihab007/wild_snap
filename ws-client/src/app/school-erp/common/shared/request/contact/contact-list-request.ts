import { Header } from "src/app/common/request/base-request";
import { ContactListRequestBody } from "./contact-list-request-body";

export class ContactListRequest {
  header: Header;
  body: ContactListRequestBody;
}
