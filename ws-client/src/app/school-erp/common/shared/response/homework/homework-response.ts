import { ResponseHeader } from "../../header/response-header";
import { HomeworkResponseBody } from "./homework-response-body";

export class HomeworkResponse {
  header: ResponseHeader = new ResponseHeader();
  body: HomeworkResponseBody;
}
