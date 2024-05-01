import { ResponseHeader } from "../../header/response-header";
import { GetStaffComboListResponseBody } from "./get-staff-combo-list-response-body";

export class GetStaffComboListResponse {
  header: ResponseHeader;
  body: GetStaffComboListResponseBody;
}
