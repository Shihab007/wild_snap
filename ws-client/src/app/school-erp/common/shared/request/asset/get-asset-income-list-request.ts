import { Header } from "src/app/common/request/base-request";
import { GetAssetIncomeListRequestBody } from "./get-asset-income-list-request-body";

export class GetAssetIncomeListRequest {
  header: Header = new Header();
  body: GetAssetIncomeListRequestBody;
}
