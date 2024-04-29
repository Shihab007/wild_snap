import { ResponseHeader } from "../../header/response-header";
import { InstituteListResponseBody } from "./institute-list-response-body";

export class InstituteListResponse {
    header: ResponseHeader;
    body: InstituteListResponseBody;
}
