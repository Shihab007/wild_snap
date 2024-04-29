import { Header } from "src/app/common/request/base-request";
import { LedgerSubGroupSaveRequestBody } from "./ledger-sub-group-save-request-body";

export class LedgerSubGroupSaveRequest {
  header: Header = new Header();
  body: LedgerSubGroupSaveRequestBody;
}
