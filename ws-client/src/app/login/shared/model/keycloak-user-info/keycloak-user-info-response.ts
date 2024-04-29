import { ResponseHeader } from "./Header/response-header";
import { KeycloakUserInfoResponseBody } from "./keycloak-user-info-response-body";

export class KeycloakUserInfoResponse {

    header: ResponseHeader;
    body: KeycloakUserInfoResponseBody
}
