import { AssignmentMarkAdd } from "../../model/assignment/assignment-mark-add";

export class AssignmentMarkEditRequestBody {

  assignmentOid: string;
  assignmentMarkList: AssignmentMarkAdd[] = [];
}
