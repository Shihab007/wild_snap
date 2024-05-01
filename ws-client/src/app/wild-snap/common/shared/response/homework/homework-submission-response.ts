
import { ResponseHeader } from "../../header/response-header";
import { HomeworkSubmissionResponseBody } from "./homework-submission-response-body";

export class HomeworkSubmissionResponse {
  header: ResponseHeader = new ResponseHeader();;
  body: HomeworkSubmissionResponseBody;
}
