import { ClassTestMarkAdd } from "../../model/class-test/class-test-mark-add";

export class ClassTestMarkAddRequestBody {

  classTestOid: string;
  classTestMarkList: ClassTestMarkAdd[] = [];

}
