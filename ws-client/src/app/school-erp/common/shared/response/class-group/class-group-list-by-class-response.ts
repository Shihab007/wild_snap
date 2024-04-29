import { ResponseHeader } from "../../header/response-header";
import { ClassGroupListByClassResponseBody } from "./class-group-list-by-class-response-body";

export class ClassGroupListByClassResponse {
  header: ResponseHeader;
  body: ClassGroupListByClassResponseBody;
}