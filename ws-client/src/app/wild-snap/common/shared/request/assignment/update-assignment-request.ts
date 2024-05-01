import { Header } from "src/app/common/request/base-request";
import { SaveUpdateAssignment } from "../../model/assignment/save-update-assignment";

export class UpdateAssignmentRequest {
  header: Header = new Header();
  body: SaveUpdateAssignment;
}
