import { ResponseHeader } from "../../header/response-header";
import { Homework } from "../../model/homework/homework";

export class GetHomeworkByOidResponse {
  header: ResponseHeader = new ResponseHeader();
  body: Homework = new Homework();
}
