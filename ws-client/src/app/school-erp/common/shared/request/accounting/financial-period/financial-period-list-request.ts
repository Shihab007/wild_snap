import { Header } from "src/app/common/request/base-request";
import { FinancialPeriodListRequestBody } from "./financial-period-list-request-body";

export class FinancialPeriodListRequest {
  header: Header = new Header();
  body: FinancialPeriodListRequestBody;
}
