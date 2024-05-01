import { ResponseHeader } from "src/app/login/shared/model/keycloak-user-info/Header/response-header";
import { ClassRoutine } from "../../model/class-routine/class-routine";
import { ClassRoutineDetailsByOidRequestBody } from "../../request/class-routine/class-routine-details-by-oid-request-body";

export class ClassRoutineDetailsByOidResponse {
  header: ResponseHeader;
  body: ClassRoutine;
}
