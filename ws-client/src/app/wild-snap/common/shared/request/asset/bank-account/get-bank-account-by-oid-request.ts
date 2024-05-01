import { Header } from "src/app/common/request/base-request";
import { GetBankAccountByOidRequestBody } from "./get-bank-account-by-oid-request-body";

export class GetBankAccountByOidRequest {
  header: Header = new Header();
  body: GetBankAccountByOidRequestBody;
}
