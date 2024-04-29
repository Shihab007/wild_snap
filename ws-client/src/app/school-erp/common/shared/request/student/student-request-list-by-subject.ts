import { RequestHeader } from "src/app/login/shared/model/keycloak-user-info/Header/request-header";
import { StudentListBySubjectRequestBody } from "./student-request-list-by-subject-body";

export class StudentListBySubjectRequest {
  header: RequestHeader;
  body: StudentListBySubjectRequestBody;
}
