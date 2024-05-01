import { ResponseHeader } from "../../../header/response-header";
import { UpdatePeopleResponseBody } from "./update-people-response-body";

export class UpdatePeopleResponse {
  header: ResponseHeader;
  body: UpdatePeopleResponseBody;
}
