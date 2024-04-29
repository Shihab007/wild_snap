import { ResponseHeader } from "../../header/response-header";
import { ContactGroupViewDetailsResponseBody } from "./contact-group-view-details-response-body";

export class ContactGroupViewDetailsResponse {
  header: ResponseHeader;
  body: ContactGroupViewDetailsResponseBody;
}
