import { AssignmentMarkAdd } from "../../model/assignment/assignment-mark-add";

export class AssignmentMarkAddRequestBody {

  assignmentOid: string;
  assignmentMarkList: AssignmentMarkAdd[] = [];

}
