import { RequestHeader } from "src/app/login/shared/model/keycloak-user-info/Header/request-header";
import { CurriculumListRequestBody } from "./curriculum-list-request-body";

export class CurriculumListRequest {
    header: RequestHeader;
    body: CurriculumListRequestBody;
}
