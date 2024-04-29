import { RequestHeader } from "../../header/request-header";
import { ContactGroupUpdateRequestBody } from "./contact-group-update-request-body";

export class ContactGroupUpdateRequest {
  header: RequestHeader;
  body: ContactGroupUpdateRequestBody;
}
