import { ResponseHeader } from "../../header/response-header";
import { StudentProfileResponseBody } from "./student-profile-response-body";

export class StudentProfileResponse {
    header: ResponseHeader;
    body: StudentProfileResponseBody;
}