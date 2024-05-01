import { ResponseHeader } from "../../header/response-header";
import { UpdateFeeDueResponseBody } from "./update-fee-due-response-body";

export class UpdateFeeDueResponse {
  header: ResponseHeader;
  body: UpdateFeeDueResponseBody;
}
