import { ResponseHeader } from "../../header/response-header";
import { GuardianEditResponseBody } from "./guardian-edit-response-body";

export class GuardianEditResponse {
  header: ResponseHeader;
  body: GuardianEditResponseBody;
}