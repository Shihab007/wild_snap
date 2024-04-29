import { ClassGroup } from "../../model/class-group/class-group";
import { ClassGroupList } from "../../model/class-group/class-group-list";

export class ClassGroupListRequestBody {

  classGroupList: ClassGroup[];
  instituteOid: string;


}