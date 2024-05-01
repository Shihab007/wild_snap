import { RequestHeader } from "../../header/request-header";
import { UpdateSubjectSettingRequestBody } from "./update-subject-setting-request-body";

export class UpdateSubjectSettingRequest {
  header: RequestHeader;
  body: UpdateSubjectSettingRequestBody;
}
