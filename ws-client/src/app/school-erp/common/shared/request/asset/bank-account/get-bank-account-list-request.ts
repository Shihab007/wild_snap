import { Header } from "src/app/common/request/base-request";
import { GetBankAccountListRequestBody } from "./get-bank-account-list-request-body";

export class GetBankAccountListRequest {
  header: Header = new Header();
  body: GetBankAccountListRequestBody;
}
