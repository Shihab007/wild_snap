import { Header } from "src/app/common/request/base-request";
import { GetListCommonRequestBody } from "./get-list-common-request-body";

export class GetListCommonRequest {
  header: Header = new Header();
  body: GetListCommonRequestBody;
}
