import { Header } from "src/app/common/request/base-request";
import { CreateFeesCollectionWithDetailsRequestBody } from "./create-fees-collection-with-details-request-body";

export class CreateFeesCollectionWithDetailsRequest {
  header: Header = new Header();
  body: CreateFeesCollectionWithDetailsRequestBody;
}
