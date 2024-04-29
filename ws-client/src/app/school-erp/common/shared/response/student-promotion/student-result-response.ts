import { ResponseHeader } from "src/app/login/shared/model/keycloak-user-info/Header/response-header";
import { StudentResultResponseBody } from "./student-result-response-body";


export class StudentResultResponse {
  header: ResponseHeader;
  body: StudentResultResponseBody;
}
