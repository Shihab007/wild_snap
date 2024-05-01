import { ResponseHeader } from "../../header/response-header";
import { ExamTextbookDetail } from "../../model/exam/exam-textbook-detail";

export class GetExamTextbookByOidResponse {

  header: ResponseHeader;
  body: ExamTextbookDetail;
}
