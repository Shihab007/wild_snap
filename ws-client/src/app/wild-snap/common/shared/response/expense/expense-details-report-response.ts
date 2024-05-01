import { ResponseHeader } from "../../header/response-header";
import { ExpenseDetailsReportResponseBody } from "./expense-details-report-response-body";
export class ExpenseDetailsReportResponse {
  header: ResponseHeader;
  body: ExpenseDetailsReportResponseBody;
}
