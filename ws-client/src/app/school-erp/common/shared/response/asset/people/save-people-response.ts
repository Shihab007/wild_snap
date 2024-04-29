import { ResponseHeader } from "../../../header/response-header";
import { SavePeopleResponseBody } from "./save-people-response-body";

export class SavePeopleResponse {
  header: ResponseHeader;
  body: SavePeopleResponseBody;
}
