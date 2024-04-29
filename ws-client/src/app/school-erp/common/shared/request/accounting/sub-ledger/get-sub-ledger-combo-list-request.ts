import { Header } from "src/app/common/request/base-request";
import { GetSubLedgerComboListRequestBody } from "./get-sub-ledger-combo-list-request-body";

export class GetSubLedgerComboListRequest {
  header: Header = new Header();
  body: GetSubLedgerComboListRequestBody;
}
