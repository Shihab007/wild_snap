import { ResponseHeader } from "../../header/response-header";
import { ClassGroupListResponseBody } from "./class-group-list-response-body";

export class ClassGroupListResponse{
    header: ResponseHeader;
    body: ClassGroupListResponseBody;
}