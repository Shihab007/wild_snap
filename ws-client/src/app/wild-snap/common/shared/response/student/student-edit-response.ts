import { ResponseHeader } from "../../header/response-header";
import { StudentEditResponseBody } from "./student-edit-response-body";

export class StudentEditResponse {
    header: ResponseHeader;
    body: StudentEditResponseBody;
}