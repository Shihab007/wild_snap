import { RequestHeader } from "src/app/school-erp/common/shared/header/request-header";
import { AdminEducationCurriculumListRequestBody } from "./admin-education-curriculum-list-request-body";

export class AdminEducationCurriculumListRequest {
  header: RequestHeader;
  body: AdminEducationCurriculumListRequestBody;
}
