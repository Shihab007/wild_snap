import { RequestHeader } from "../../header/request-header";
import { AdmissionSelectionRequestBody } from "./admission-selection-request-body";

export class AdmissionSelectionRequest {
  header: RequestHeader;
  body: AdmissionSelectionRequestBody;
}
