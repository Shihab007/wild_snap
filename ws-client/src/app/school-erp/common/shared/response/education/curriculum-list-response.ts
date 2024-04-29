import { ResponseHeader } from "src/app/login/shared/model/keycloak-user-info/Header/response-header";
import { LoginResponseHeader } from "src/app/login/shared/model/login-response-header";
import { CurriculumListResponseBody } from "./curriculum-list-response-body";

export class CurriculumListResponse {
    header: ResponseHeader;
    body: CurriculumListResponseBody;
    
}
