import { ResponseHeader } from "../../header/response-header";
import { PaymentListResponseBody } from "./payment-list-response-body";

export class PaymentListResponse {
  header: ResponseHeader;
  body: PaymentListResponseBody;
}
