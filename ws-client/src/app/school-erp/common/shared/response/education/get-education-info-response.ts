import { RequestHeader } from "../../header/request-header";
import { ResponseHeader } from "../../header/response-header";
import { GetEducationInfoResponseBody } from "./get-education-info-response-body";

export class GetEducationInfoResponse {
  header: ResponseHeader;
  body: GetEducationInfoResponseBody;
}
