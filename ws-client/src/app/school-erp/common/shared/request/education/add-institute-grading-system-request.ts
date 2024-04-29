import { Header } from "src/app/common/request/base-request";
import { AddInstituteGradingSystemRequestBody } from "./add-institute-grading-system-request-body";

export class AddInstituteGradingSystemRequest {
  header: Header = new Header();
  body: AddInstituteGradingSystemRequestBody;
}
