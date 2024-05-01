import { ResponseHeader } from "../../header/response-header";
import { GetLedgerByOidResponseBody } from "./get-ledger-by-oid-response-body";

export class GetLedgerByOidResponse {
  header: ResponseHeader;
  body: GetLedgerByOidResponseBody;
}
