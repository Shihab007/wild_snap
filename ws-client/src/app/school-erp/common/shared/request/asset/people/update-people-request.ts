import { Header } from "src/app/common/request/base-request";
import { UpdatePeopleRequestBody } from "./update-people-request-body";

export class UpdatePeopleRequest {
  header: Header = new Header();
  body: UpdatePeopleRequestBody;
}
