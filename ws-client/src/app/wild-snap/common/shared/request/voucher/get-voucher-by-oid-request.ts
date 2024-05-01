import { RequestHeader } from "../../header/request-header";
import { GetVoucherByOidRequestBody } from "./get-voucher-by-oid-request-body";

export class GetVoucherByOidRequest {
  header: RequestHeader;
  body: GetVoucherByOidRequestBody;
}
