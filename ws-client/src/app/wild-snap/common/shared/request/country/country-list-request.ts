import { RequestHeader } from "../../header/request-header";
import { CountryListRequestBody } from "./country-list-request-body";

export class CountryListRequest {
  header: RequestHeader;
  body: CountryListRequestBody;
}
