import { Header } from "src/app/common/request/base-request";
import { HomeworkRequestBody } from "./homework-request-body";

export class HomeworkRequest {
  header: Header = new Header();
  body: HomeworkRequestBody;

}
