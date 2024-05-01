import { ResponseHeader } from "../../../header/response-header";
import { ApprovePeopleResponseBody } from "./approve-people-response-body";

export class ApprovePeopleResponse {
  header: ResponseHeader;
  body: ApprovePeopleResponseBody;
}
