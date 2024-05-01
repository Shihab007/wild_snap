import { RequestHeader } from "../../header/request-header";
import { GetVoucherPaymentListByGuardianIdRequestBody } from "./get-voucher-payment-list-by-guardian-id-request-body";

export class GetVoucherPaymentListByGuardianIdRequest {
  header: RequestHeader;
  body: GetVoucherPaymentListByGuardianIdRequestBody;
}
