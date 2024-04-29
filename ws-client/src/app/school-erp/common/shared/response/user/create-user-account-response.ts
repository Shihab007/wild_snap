
import { ResponseHeader } from "../../header/response-header";
import { CreateUserAccountResponseBody } from "./create-user-account-response-body";

export class CreateUserAccountResponse {
  header: ResponseHeader = new ResponseHeader();
  body: CreateUserAccountResponseBody;
}
