import { RequestHeader } from "../../header/request-header";
import { GuardianEditRequestBody } from "./guardian-edit-request-body";

export class GuardianEditRequest {
  header: RequestHeader;
  body: GuardianEditRequestBody;
}