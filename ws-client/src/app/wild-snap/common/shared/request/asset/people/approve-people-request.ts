import { RequestHeader } from "../../../header/request-header";
import { ApprovePeopleRequestBody } from "./approve-people-request-body";

export class ApprovePeopleRequest {
  header: RequestHeader;
  body: ApprovePeopleRequestBody;
}
