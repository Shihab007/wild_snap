import { RequestHeader } from "src/app/login/shared/model/keycloak-user-info/Header/request-header";
import { StudentResultRequestBody } from "./student-result-request-body";

export class StudentResultRequest {
  header: RequestHeader;
  body: StudentResultRequestBody;
}
