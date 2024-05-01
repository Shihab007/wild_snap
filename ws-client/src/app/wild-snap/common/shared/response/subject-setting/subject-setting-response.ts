import { ResponseHeader } from "../../header/response-header";
import { SubjectSettingResponseBody } from "./subject-setting-response-body";

export class SubjectSettingResponse {
  header: ResponseHeader;
  body: SubjectSettingResponseBody;
}
