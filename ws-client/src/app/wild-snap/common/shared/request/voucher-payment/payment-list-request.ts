import { RequestHeader } from "../../header/request-header";
import { PaymentListRequestBody } from "./payment-list-request-body";

export class PaymentListRequest {
  header: RequestHeader;
  body: PaymentListRequestBody;
}
