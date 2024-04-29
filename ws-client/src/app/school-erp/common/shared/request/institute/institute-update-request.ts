import { Header } from "src/app/common/request/base-request";
import { InstituteUpdateRequestBody } from "./institute-update-request-body";

export class InstituteUpdateRequest {
  header: Header = new Header();
  body: InstituteUpdateRequestBody;
}
