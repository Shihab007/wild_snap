import { ResponseHeader } from "../../header/response-header";
import { PeriodCreateResponseBody } from "./period-create-response-body";

export class PeriodCreateResponse {
  header: ResponseHeader;
  body: PeriodCreateResponseBody;
}
