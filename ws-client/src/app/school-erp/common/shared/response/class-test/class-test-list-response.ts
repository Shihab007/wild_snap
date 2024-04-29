import { ResponseHeader } from "../../header/response-header";
import { ClassTestListResponseBody } from "./class-test-list-response-body";

export class ClassTestListResponse {
  header: ResponseHeader;
  body: ClassTestListResponseBody;
}
