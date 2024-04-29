import { Header } from "src/app/common/request/base-request";
import { InstituteShiftModelRequestBody } from "./institute-shift-model-request-body";

export class InstituteShiftModelRequest {
  header: Header = new Header();
  body: InstituteShiftModelRequestBody = new InstituteShiftModelRequestBody();
}