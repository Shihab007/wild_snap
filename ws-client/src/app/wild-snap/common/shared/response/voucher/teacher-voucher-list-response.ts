import { ResponseHeader } from "../../header/response-header";
import { TeacherVoucherListResponseBody } from "./teacher-voucher-list-response-body";

export class TeacherVoucherListResponse {
  header: ResponseHeader;
  body: TeacherVoucherListResponseBody;
}
