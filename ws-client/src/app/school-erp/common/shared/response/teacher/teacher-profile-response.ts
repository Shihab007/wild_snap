import { ResponseHeader } from "../../header/response-header";
import { TeacherProfileResponseBody } from "./teacher-profile-response-body";

export class TeacherProfileResponse {
    header: ResponseHeader;
    body: TeacherProfileResponseBody;
}