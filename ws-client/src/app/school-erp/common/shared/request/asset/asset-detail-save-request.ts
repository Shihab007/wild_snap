import { RequestHeader } from "src/app/login/shared/model/keycloak-user-info/Header/request-header";
import { AssetDetailSaveRequestBody } from "./asset-detail-save-request-body";

export class AssetDetailSaveRequest {
  header: RequestHeader;
  body: AssetDetailSaveRequestBody;
}
