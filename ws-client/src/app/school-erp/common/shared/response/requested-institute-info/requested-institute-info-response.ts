import { ResponseHeader } from "../../header/response-header";
import { RequestedInstituteInfoResponseBody } from "./requested-institute-info-response-body";

export class RequestedInstituteInfoResponse {
  header: ResponseHeader;
  body: RequestedInstituteInfoResponseBody;
}
