import { RequestHeader } from "../../header/request-header";
import { ContactGroupViewDetailsRequestBody } from "./contact-group-view-details-request-body";

export class ContactGroupViewDetailsRequest {
  header: RequestHeader;
  body: ContactGroupViewDetailsRequestBody;
}
