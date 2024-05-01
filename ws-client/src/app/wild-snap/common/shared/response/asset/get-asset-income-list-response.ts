import { ResponseHeader } from "../../header/response-header";
import { GetAssetIncomeListResponseBody } from "./get-asset-income-list-response-body";

export class GetAssetIncomeListResponse {
  header: ResponseHeader;
  body: GetAssetIncomeListResponseBody;
}
