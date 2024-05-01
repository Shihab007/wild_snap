import { RequestHeader } from "../../header/request-header";
import { ClassRoutineDetailsByOidRequestBody } from "./class-routine-details-by-oid-request-body";

export class ClassRoutineDetailsByOidRequest {
  header: RequestHeader;
  body: ClassRoutineDetailsByOidRequestBody;
}
