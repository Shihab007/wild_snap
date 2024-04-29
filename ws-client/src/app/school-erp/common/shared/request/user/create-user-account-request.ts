import { Header } from "src/app/common/request/base-request";
import { CreateUserAccountRequestBody } from "./create-user-account-request-body";

export class CreateUserAccountRequest {
  header: Header = new Header();
  body: CreateUserAccountRequestBody;
}
