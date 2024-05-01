import { ResponseHeader } from "../../header/response-header";
import { VoucherListResponseBody } from "./voucher-list-response-body";

export class VoucherListResponse {
  header: ResponseHeader;
  body: VoucherListResponseBody;
}
