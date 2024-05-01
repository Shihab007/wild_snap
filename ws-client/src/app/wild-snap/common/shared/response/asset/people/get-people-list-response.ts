import { ResponseHeader } from "../../../header/response-header";
import { GetPeopleListResponseBody } from "./get-people-list-response-body";

export class GetPeopleListResponse {
  header: ResponseHeader;
  body: GetPeopleListResponseBody;
}
