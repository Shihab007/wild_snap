import { ResponseHeader } from "../../header/response-header";
import { GetAssetIncomeByOidResponseBody } from "./get-asset-income-by-oid-response-body";

export class GetAssetIncomeByOidResponse {
  header: ResponseHeader;
  body: GetAssetIncomeByOidResponseBody;
}
