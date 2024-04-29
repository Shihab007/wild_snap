import { Header } from "src/app/common/request/base-request";
import { IncomeCollectionReportRequestBody } from "./income-collection-report-request-body";

export class IncomeCollectionReportRequest {
  header: Header = new Header();
  body: IncomeCollectionReportRequestBody;
}
