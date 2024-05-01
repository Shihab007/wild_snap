import { RequestHeader } from "../../header/request-header";
import { PeriodListRequestBody } from "./period-list-request-body";

export class PeriodListRequest {
    header : RequestHeader;
    body: PeriodListRequestBody;
}
