import { Header } from "src/app/common/request/base-request";
import { UpdateVoucherRequestBody } from "./update-voucher-request-body";

export class UpdateVoucherRequest {
  header: Header = new Header();
  body: UpdateVoucherRequestBody;
}
