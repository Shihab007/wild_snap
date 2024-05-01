import { Header } from "src/app/common/request/base-request";
import { CreateRepeatedFeesRequestBody } from "./create-repeated-fees-request-body";

export class CreateRepeatedFeesRequest {
  header: Header = new Header();
  body: CreateRepeatedFeesRequestBody;
}
