import { ResponseHeader } from "src/app/login/shared/model/keycloak-user-info/Header/response-header";
import { StudentListResponseBody } from "./student-list-response-body";

export class StudentListResponse {
    header: ResponseHeader;
    body: StudentListResponseBody;
}
