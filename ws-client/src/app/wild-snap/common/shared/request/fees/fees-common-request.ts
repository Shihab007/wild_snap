import { Header } from "src/app/common/request/base-request";
import { FeesCommonRequestBody } from "./fees-common-request-body";

export class FeesCommonRequest {
  header: Header = new Header();
  body: FeesCommonRequestBody;
}
