import { RequestHeader } from "../../header/request-header";
import { VoucherListRequestBody } from "./voucher-list-request-body";

export class VoucherListRequest {
  header: RequestHeader;
  body: VoucherListRequestBody;
}
