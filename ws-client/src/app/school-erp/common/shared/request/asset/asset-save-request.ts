import { RequestHeader } from "src/app/login/shared/model/keycloak-user-info/Header/request-header";
import { AssetSaveRequestBody } from "./asset-save-request-body";

export class AssetSaveRequest {
  header: RequestHeader;
  body: AssetSaveRequestBody;
}
