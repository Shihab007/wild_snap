import { ResponseHeader } from "../../header/response-header";
import { DistrictListResponseBody } from "./district-list-response-body";

export class DistrictListResponse {
    header: ResponseHeader;
    body: DistrictListResponseBody;
}
