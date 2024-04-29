import { Header } from "src/app/common/request/base-request";
import { SaveLedgerRequestBody } from "./save-ledger-request-body";

export class SaveLedgerRequest {
  header: Header = new Header();
  body: SaveLedgerRequestBody;
}
