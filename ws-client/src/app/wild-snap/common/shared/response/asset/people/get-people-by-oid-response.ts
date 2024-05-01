import { ResponseHeader } from "../../../header/response-header";
import { GetPeopleByOidResponseBody } from "./get-people-by-oid-response-body";

export class GetPeopleByOidResponse {
  header: ResponseHeader;
  body: GetPeopleByOidResponseBody;
}
