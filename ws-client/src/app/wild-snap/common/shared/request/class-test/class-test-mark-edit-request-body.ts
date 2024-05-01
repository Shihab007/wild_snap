import { ClassTestMarkAdd } from "../../model/class-test/class-test-mark-add";

export class ClassTestMarkEditRequestBody {
  classTestOid: string;
  classTestMarkList: ClassTestMarkAdd[] = [];
}
