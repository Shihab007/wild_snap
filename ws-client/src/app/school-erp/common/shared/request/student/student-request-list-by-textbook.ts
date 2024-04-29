import { RequestHeader } from "src/app/login/shared/model/keycloak-user-info/Header/request-header";
import { StudentListByTextbookRequestBody } from "./student-request-list-by-textbook-body";

export class StudentListByTextbookRequest {
  header: RequestHeader;
  body: StudentListByTextbookRequestBody;
}
