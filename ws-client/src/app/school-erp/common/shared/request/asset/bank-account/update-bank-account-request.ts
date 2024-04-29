import { Header } from "src/app/common/request/base-request";
import { UpdateBankAccountRequestBody } from "./update-bank-account-request-body";

export class UpdateBankAccountRequest {
  header: Header = new Header();
  body: UpdateBankAccountRequestBody;
}
