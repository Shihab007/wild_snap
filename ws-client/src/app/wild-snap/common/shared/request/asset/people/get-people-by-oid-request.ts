import { Header } from "src/app/common/request/base-request";
import { GetPeopleByOidRequestBody } from "./get-people-by-oid-request-body";

export class GetPeopleByOidRequest {
  header: Header = new Header();
  body: GetPeopleByOidRequestBody;
}
