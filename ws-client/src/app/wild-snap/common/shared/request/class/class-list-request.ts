import { RequestHeader } from "../../header/request-header";
import { ClassListRequestBody } from "./class-list-request-body";

export class ClassListRequest {

    header: RequestHeader;
    body: ClassListRequestBody;
}
