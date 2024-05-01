import { ResponseHeader } from "src/app/login/shared/model/keycloak-user-info/Header/response-header";
import { InstituteShiftModelResponseBody } from "./institute-shift-model-response-body";

export class InstituteShiftModelResponse {
  header: ResponseHeader = new ResponseHeader();
  body: InstituteShiftModelResponseBody = new InstituteShiftModelResponseBody();
}