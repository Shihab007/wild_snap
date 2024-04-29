import { Header } from "src/app/common/request/base-request";
import { GetPeopleListRequestBody } from "./get-people-list-request-body";

export class GetPeopleListRequest {
  header: Header = new Header();
  body: GetPeopleListRequestBody;
}
