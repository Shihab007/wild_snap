import { Header } from "src/app/common/request/base-request";
import { GetFeesCollectionListRequestBody } from "./get-fees-collection-list-request-body";

export class GetFeesCollectionListRequest {
  header: Header = new Header();
  body: GetFeesCollectionListRequestBody;
}
