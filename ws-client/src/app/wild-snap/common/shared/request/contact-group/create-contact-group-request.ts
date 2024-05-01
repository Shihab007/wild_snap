import { RequestHeader } from "../../header/request-header";
import { CreateContactGroupRequestBody } from "./create-contact-group-request-body";

export class CreateContactGroupRequest {
  header: RequestHeader;
  body: CreateContactGroupRequestBody;
}
