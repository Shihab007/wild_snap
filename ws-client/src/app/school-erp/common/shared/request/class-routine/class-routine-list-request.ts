import { RequestHeader } from "../../header/request-header";
import { ClassRoutineListRequestBody } from "./class-routine-list-request-body";

export class ClassRoutineListRequest {
    header : RequestHeader;
    body : ClassRoutineListRequestBody;
}
