import { ResponseHeader } from "../../../header/response-header";
import { GetFinancialPeriodByOidResponseBody } from "./get-financial-period-by-oid-response-body";

export class GetFinancialPeriodByOidResponse {
  header: ResponseHeader;
  body: GetFinancialPeriodByOidResponseBody;
}
