import { Header } from "src/app/common/request/base-request";
import { HomeworkListByGuardianIdRequestBody } from "./homework-list-by-guardian-id-request-body";

export class HomeworkListByGuardianIdRequest {
  header: Header;
  body: HomeworkListByGuardianIdRequestBody;

}
