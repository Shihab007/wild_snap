import { Header } from "src/app/common/request/base-request";
import { UpdateFeeDueRequestBody } from "./update-fee-due-request-body";

export class UpdateFeeDueRequest {
  header: Header;
  body: UpdateFeeDueRequestBody;
}
