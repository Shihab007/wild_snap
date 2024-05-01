import { RequestHeader } from "../../header/request-header";
import { PaymentViewRequestBody } from "./payment-view-request-body";

export class PaymentViewRequest {
  header: RequestHeader;
  body: PaymentViewRequestBody;
}
