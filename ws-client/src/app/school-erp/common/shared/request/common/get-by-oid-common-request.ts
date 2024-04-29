import { Header } from "src/app/common/request/base-request";
import { GetByOidCommonRequestBody } from "./get-by-oid-common-request-body";

export class GetByOidCommonRequest {
  header: Header = new Header();
  body: GetByOidCommonRequestBody;
}
