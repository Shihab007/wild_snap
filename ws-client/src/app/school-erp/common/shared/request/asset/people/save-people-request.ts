import { Header } from "src/app/common/request/base-request";
import { SavePeopleRequestBody } from "./save-people-request-body";

export class SavePeopleRequest {
  header: Header = new Header();
  body: SavePeopleRequestBody;
}
