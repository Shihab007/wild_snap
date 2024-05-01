import { Header } from "src/app/common/request/base-request";
import { LedgerGroupListRequestBody } from "./ledger-group-list-request-body";

export class LedgerGroupListRequest {
  header: Header = new Header();
  body: LedgerGroupListRequestBody;
}
