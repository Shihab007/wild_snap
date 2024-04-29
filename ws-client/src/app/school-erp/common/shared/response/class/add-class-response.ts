import { ResponseHeader } from "../../header/response-header";
import { AddClassResponseBody } from "./add-class-response-body";

export class AddClassResponse {
  header: ResponseHeader;
  body: AddClassResponseBody;
}
