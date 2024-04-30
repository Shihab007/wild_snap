import { ResponseHeader } from "src/app/school-erp/common/shared/header/response-header";
import { AdminEducationCurriculumListResponseBody } from "./admin-education-curriculum-list-response-body";

export class AdminEducationCurriculumListResponse {
  header: ResponseHeader;
  body: AdminEducationCurriculumListResponseBody;
}