import { RequestHeader } from "../../header/request-header";
import { ContactListByGuardianRequestBody } from "./contact-list-by-guardian-request-body";

export class ContactListByGuardianRequest {
  header: RequestHeader;
  body: ContactListByGuardianRequestBody;
}
