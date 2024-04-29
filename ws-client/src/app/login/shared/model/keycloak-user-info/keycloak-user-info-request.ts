import { RequestHeader } from "./Header/request-header";
import { KeycloakUserInfoRequestBody } from "./keycloak-user-info-request-body";

export class KeycloakUserInfoRequest {

    header: RequestHeader;
    body: KeycloakUserInfoRequestBody
}
