import { ResponseHeader } from "../../header/response-header";
import { HomeworkListByGuardianIdResponseBody } from "./homework-list-by-guardian-id-response-body";

export class HomeworkListByGuardianIdResponse {
  header: ResponseHeader;
  body: HomeworkListByGuardianIdResponseBody;
}
