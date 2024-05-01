import { RequestHeader } from "../../header/request-header";
import { TeacherListRequestBody } from "./teacher-list-request-body";

export class TeacherListRequest {
    header: RequestHeader;
    body: TeacherListRequestBody;
}
