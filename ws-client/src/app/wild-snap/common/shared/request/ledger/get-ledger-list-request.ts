import { Header } from "src/app/common/request/base-request";
import { GetLedgerListRequestBody } from "./get-ledger-list-request-body";

export class GetLedgerListRequest {
  header: Header = new Header();
  body: GetLedgerListRequestBody;
}
