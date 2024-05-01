import { Header } from "src/app/common/request/base-request";
import { GetAssetIncomeByOidRequestBody } from "./get-asset-income-by-oid-request-body";

export class GetAssetIncomeByOidRequest {
  header: Header = new Header();
  body: GetAssetIncomeByOidRequestBody;
}
