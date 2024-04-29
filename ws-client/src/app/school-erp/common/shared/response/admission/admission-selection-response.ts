import { ResponseHeader } from "../../header/response-header";
import { AdmissionSelectionResponseBody } from "./admission-selection-response-body";

export class AdmissionSelectionResponse {
  header: ResponseHeader;
  body: AdmissionSelectionResponseBody;
}
