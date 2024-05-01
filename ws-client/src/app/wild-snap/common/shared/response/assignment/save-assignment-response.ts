import { ResponseHeader } from "../../header/response-header";
import { SaveAssignmentResponseBody } from "./save-assignment-response-body";

export class SaveAssignmentResponse {

  header: ResponseHeader = new ResponseHeader();
  body: SaveAssignmentResponseBody;

}
