import { ResponseHeader } from "src/app/login/shared/model/keycloak-user-info/Header/response-header";
import { TeacherListResponseBody } from "./teacher-list-response-body";

export class TeacherListResponse {
    header: ResponseHeader;
    body: TeacherListResponseBody;
}
