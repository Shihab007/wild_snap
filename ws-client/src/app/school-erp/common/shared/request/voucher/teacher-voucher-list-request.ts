import { RequestHeader } from "../../header/request-header";
import { TeacherVoucherListRequestBody } from "./teacher-voucher-list-request-body";

export class TeacherVoucherListRequest {
  header: RequestHeader;
  body: TeacherVoucherListRequestBody;
}
