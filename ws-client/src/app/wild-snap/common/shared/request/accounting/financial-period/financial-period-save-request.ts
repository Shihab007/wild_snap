import { Header } from "src/app/common/request/base-request";
import { FinancialPeriodSaveRequestBody } from "./financial-period-save-request-body";

export class FinancialPeriodSaveRequest {
  header: Header = new Header();
  body: FinancialPeriodSaveRequestBody;
}
