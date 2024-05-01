import { ResponseHeader } from "../../../header/response-header";
import { GetBankAccountListResponseBody } from "./get-bank-account-list-response-body";

export class GetBankAccountListResponse {
  header: ResponseHeader;
  body: GetBankAccountListResponseBody;
}
