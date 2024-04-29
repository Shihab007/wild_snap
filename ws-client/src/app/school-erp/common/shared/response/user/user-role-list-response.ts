
import { ResponseHeader } from "../../header/response-header";
import { UserRoleListResponseBody } from "./user-role-list-response-body";

export class UserRoleListResponse {
  header: ResponseHeader = new ResponseHeader();
  body: UserRoleListResponseBody;
}
