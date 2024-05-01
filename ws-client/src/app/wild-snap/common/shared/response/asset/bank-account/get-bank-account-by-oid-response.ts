import { ResponseHeader } from "../../../header/response-header";
import { GetBankAccountByOidResponseBody } from "./get-bank-account-by-oid-response-body";

export class GetBankAccountByOidResponse {
  header: ResponseHeader;
  body: GetBankAccountByOidResponseBody;
}
