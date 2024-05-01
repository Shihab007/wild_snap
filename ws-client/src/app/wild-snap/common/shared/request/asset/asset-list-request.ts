import { Header } from "src/app/common/request/base-request";
import { RequestHeader } from "src/app/login/shared/model/keycloak-user-info/Header/request-header";
import { AssetListRequestBody } from "./asset-list-request-body";

export class AssetListRequest {
  header: Header = new Header();
  body: AssetListRequestBody;
}
