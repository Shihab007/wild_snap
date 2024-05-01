import { ResponseHeader } from "../../header/response-header";
import { PaymentViewResponseBody } from "./payment-view-response-body";

export class PaymentViewResponse {
  header: ResponseHeader;
  body: PaymentViewResponseBody;
}
