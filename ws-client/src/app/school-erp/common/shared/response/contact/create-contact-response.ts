import { ResponseHeader } from "../../header/response-header";
import { CreateContactResponseBody } from "./create-contact-response-body";

export class CreateContactResponse {
  header: ResponseHeader;
  body: CreateContactResponseBody;
}
