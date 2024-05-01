import { InstituteClassEntity } from "../../model/institute/institute-class-entity";

export class GetClassListBySessionOidResponseBody {

  instituteClassList: InstituteClassEntity[];
  instituteClassLevelList: InstituteClassEntity[];
}
