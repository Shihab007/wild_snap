import { Header } from "src/app/common/request/base-request";
import { LedgerSubGroupListRequestBody } from "./ledger-sub-group-list-request-body";

export class LedgerSubGroupListRequest {
  header: Header = new Header();
  body: LedgerSubGroupListRequestBody;
}
