import { ResponseHeader } from "../../../header/response-header";
import { FinancialPeriodListResponseBody } from "./financial-period-list-response-body";

export class FinancialPeriodListResponse {
  header: ResponseHeader;
  body: FinancialPeriodListResponseBody;
}
