import { RequestHeader } from "../../header/request-header";
import { DistrictListRequestBody } from "./district-list-request-body";

export class DistrictListRequest {
    header: RequestHeader;
    body: DistrictListRequestBody;
}
