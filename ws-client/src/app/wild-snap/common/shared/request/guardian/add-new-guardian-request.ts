import { Header } from "src/app/common/request/base-request";
import { RequestHeader } from "../../header/request-header";
import { AddNewGuardianRequestBody } from "./add-new-guardian-request-body";

export class AddNewGuardianRequest {
  header: Header = new Header();
  body: AddNewGuardianRequestBody;
}
