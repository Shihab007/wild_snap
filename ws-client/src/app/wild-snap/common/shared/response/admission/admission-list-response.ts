import { ResponseHeader } from "../../header/response-header";
import { AdmissionListResponseBody } from "./admission-list-response-body";

export class AdmissionListResponse {
    header:ResponseHeader;
    body:AdmissionListResponseBody;
}
