import { RequestHeader } from "../../header/request-header";
import { ContactListByOthersRequestBody } from "./contact-list-by-others-request-body";

export class ContactListByOthersRequest {
  header: RequestHeader;
  body: ContactListByOthersRequestBody;
}
