import { ResponseHeader } from "../../../header/response-header";
import { GetPaymentModeResponseBody } from "./get-payment-mode-response-body";

export class GetPaymentModeResponse {
  header: ResponseHeader;
  body: GetPaymentModeResponseBody;
}
