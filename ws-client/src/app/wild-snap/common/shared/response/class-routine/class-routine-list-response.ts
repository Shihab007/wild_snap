import { ResponseHeader } from "../../header/response-header";
import { ClassRoutineListResponseBody } from "./class-routine-list-response-body";

export class ClassRoutineListResponse {
    header: ResponseHeader;
    body: ClassRoutineListResponseBody;
}
