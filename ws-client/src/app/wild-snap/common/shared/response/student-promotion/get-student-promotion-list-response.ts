import { ResponseHeader } from "src/app/login/shared/model/keycloak-user-info/Header/response-header";
import { GetStudentPromotionListResponseBody } from "./get-student-promotion-list-response-body";

export class GetStudentPromotionListResponse {
  header: ResponseHeader;
  body: GetStudentPromotionListResponseBody;
}
