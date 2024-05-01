import { Header } from "src/app/common/request/base-request";
import { SyllabusListRequestBody } from "./syllabus-list-request-body";

export class SyllabusListRequest {
  header: Header = new Header();
  body: SyllabusListRequestBody;

}
