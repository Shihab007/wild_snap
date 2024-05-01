import { RequestHeader } from "src/app/login/shared/model/keycloak-user-info/Header/request-header";
import { StudentRequestListBody } from "./student-request-list-body";

export class StudentRequestList {
    header: RequestHeader;
    body: StudentRequestListBody;
}
