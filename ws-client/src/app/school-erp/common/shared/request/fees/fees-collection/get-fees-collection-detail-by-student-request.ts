import { Header } from "src/app/common/request/base-request";
import { GetFeesCollectionDetailByStudentRequestBody } from "./get-fees-collection-detail-by-student-request-body";

export class GetFeesCollectionDetailByStudentRequest {
  header: Header = new Header();
  body: GetFeesCollectionDetailByStudentRequestBody;
}
