import { RequestHeader } from "../../header/request-header";
import { GetStaffComboListRequestBody } from "./get-staff-combo-list-request-body";

export class GetStaffComboListRequest {
  header: RequestHeader;
  body: GetStaffComboListRequestBody;
}
