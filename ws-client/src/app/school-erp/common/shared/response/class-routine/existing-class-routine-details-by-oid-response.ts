import { ResponseHeader } from "src/app/login/shared/model/keycloak-user-info/Header/response-header";
import { ExistingClassRoutineDetailsByOidResponseBody } from "./existing-class-routine-details-by-oid-response-body";

export class ExistingClassRoutineDetailsByOidResponse {
  header: ResponseHeader;
  body: ExistingClassRoutineDetailsByOidResponseBody;
}
