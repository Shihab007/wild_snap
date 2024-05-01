import { ResponseHeader } from "../../header/response-header";
import { Voucher } from "../../model/voucher/voucher";

export class GetVoucherByOidResponse {
  header: ResponseHeader;
  body: Voucher;
}
