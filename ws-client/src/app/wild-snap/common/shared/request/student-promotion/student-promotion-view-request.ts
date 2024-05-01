import { RequestHeader } from "../../header/request-header";
import { StudentPromotionViewRequestBody } from "./student-promotion-view-request-body";

export class StudentPromotionViewRequest {
  header: RequestHeader;
  body: StudentPromotionViewRequestBody;
}
