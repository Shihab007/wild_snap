import { Header } from "src/app/common/request/base-request";
import { UserRoleListRequestBody } from "./user-role-list-request-body";

export class UserRoleListRequest {
  header: Header = new Header();
  body: UserRoleListRequestBody;
}
