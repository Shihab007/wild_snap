import { RequestHeader } from "../../../header/request-header";
import { RejectPeopleRequestBody } from "./reject-people-request-body";

export class RejectPeopleRequest {
  header: RequestHeader;
  body: RejectPeopleRequestBody;
}
