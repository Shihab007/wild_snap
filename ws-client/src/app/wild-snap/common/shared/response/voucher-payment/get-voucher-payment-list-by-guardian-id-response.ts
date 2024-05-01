import { ResponseHeader } from "../../header/response-header";
import { GetVoucherPaymentListByGuardianIdResponseBody } from "./get-voucher-payment-list-by-guardian-id-response-body";

export class GetVoucherPaymentListByGuardianIdResponse {
  header: ResponseHeader;
  body: GetVoucherPaymentListByGuardianIdResponseBody;
}
