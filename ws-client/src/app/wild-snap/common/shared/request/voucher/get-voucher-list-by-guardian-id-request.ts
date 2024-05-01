import { RequestHeader } from "../../header/request-header";
import { GetVoucherListByGuardianIdRequestBody } from "./get-voucher-list-by-guardian-id-request-body";

export class GetVoucherListByGuardianIdRequest {
  header: RequestHeader;
  body: GetVoucherListByGuardianIdRequestBody;
}
