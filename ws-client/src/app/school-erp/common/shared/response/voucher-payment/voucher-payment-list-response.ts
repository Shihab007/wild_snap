import { ResponseHeader } from "../../header/response-header";
import { VoucherPaymentListResponseBody } from "./voucher-payment-list-response-body";

export class VoucherPaymentListResponse {
  header: ResponseHeader;
  body: VoucherPaymentListResponseBody;
}
