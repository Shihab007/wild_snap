import { Header } from "src/app/common/request/base-request";
import { CloseFinancialPeriodRequestBody } from "./close-financial-period-request-body";

export class CloseFinancialPeriodRequest {
  header: Header = new Header();
  body: CloseFinancialPeriodRequestBody;
}
