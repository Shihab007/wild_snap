import { ResponseHeader } from "../../header/response-header";
import { ContactListByOthersResponseBody } from "./contact-list-by-others-response-body";

export class ContactListByOthersResponse {
  header: ResponseHeader;
  body: ContactListByOthersResponseBody;
}
