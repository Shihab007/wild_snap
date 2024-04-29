import { RequestHeader } from "../../header/request-header";
import { SaveVoucherRequestBody } from "./save-voucher-request-body";

export class SaveVoucherRequest {
  header: RequestHeader;
  body: SaveVoucherRequestBody;
}
