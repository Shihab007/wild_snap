import { RequestHeader } from "../../header/request-header";
import { AddClassRequestBody } from "./add-class-request-body";

export class AddClassRequest {
  
  header: RequestHeader;
  body: AddClassRequestBody;
}
