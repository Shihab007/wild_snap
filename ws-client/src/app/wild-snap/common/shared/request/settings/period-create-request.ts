import { RequestHeader } from "../../header/request-header";
import { PeriodCreateRequestBody } from "./period-create-request-body";

export class PeriodCreateRequest {
  header: RequestHeader;
  body: PeriodCreateRequestBody;
}
