import { RequestHeader } from "../../header/request-header";
import { CreateContactRequestBody } from "./create-contact-request-body";

export class CreateContactRequest {
  header: RequestHeader;
  body: CreateContactRequestBody;
}
