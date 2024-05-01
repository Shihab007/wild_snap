import { ResponseHeader } from "../../header/response-header";
import { CommonSaveOrUpdateResponseBody } from "./common-save-or-update-response-body";

export class CommonSaveOrUpdateResponse {
  header: ResponseHeader;
  body: CommonSaveOrUpdateResponseBody;
}
