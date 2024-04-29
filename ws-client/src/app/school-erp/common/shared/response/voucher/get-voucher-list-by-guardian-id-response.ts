import { ResponseHeader } from "../../header/response-header";
import { GetVoucherListByGuardianIdResponseBody } from "./get-voucher-list-by-guardian-id-response-body";

export class GetVoucherListByGuardianIdResponse {
  header: ResponseHeader;
  body: GetVoucherListByGuardianIdResponseBody;
}
