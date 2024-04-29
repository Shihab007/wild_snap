import { ResponseHeader } from "../../header/response-header";
import { SaveVoucherResponseBody } from "./save-voucher-response-body";

export class SaveVoucherResponse {
  header: ResponseHeader;
  body: SaveVoucherResponseBody;
}
