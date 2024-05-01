import { Header } from "src/app/common/request/base-request";
import { GetPaymentModeListRequestBody } from "./get-payment-mode-list-request-body";

export class GetPaymentModeListRequest {
  header: Header = new Header();
  body: GetPaymentModeListRequestBody;
}
