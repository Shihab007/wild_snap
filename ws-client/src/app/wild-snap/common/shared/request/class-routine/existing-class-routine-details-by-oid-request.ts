import { RequestHeader } from "../../header/request-header";
import { ExistingClassRoutineDetailsByOidRequestBody } from "./existing-class-routine-details-by-oid-request-body";

export class ExistingClassRoutineDetailsByOidRequest {
  header: RequestHeader;
  body: ExistingClassRoutineDetailsByOidRequestBody;
}
