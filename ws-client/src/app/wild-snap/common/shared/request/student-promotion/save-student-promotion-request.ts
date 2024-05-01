import { RequestHeader } from "src/app/login/shared/model/keycloak-user-info/Header/request-header";
import { SaveStudentPromotionRequestBody } from "./save-student-promotion-request-body";

export class SaveStudentPromotionRequest {
  header: RequestHeader;
  body: SaveStudentPromotionRequestBody;
}
