import { ResponseHeader } from "../../../header/response-header";
import { CreateRepeatedFeesResponseBody } from "./create-repeated-fees-response-body";

export class CreateRepeatedFeesResponse {
  header: ResponseHeader;
  body: CreateRepeatedFeesResponseBody;
}
