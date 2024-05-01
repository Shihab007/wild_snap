import { DueFees } from "../../../model/fees/due-fees";
import { DueFeesHistory } from "../../../model/fees/due-fees-history";

export class GetDueFeesHistoryByInstituteAndClassResponseBody {

  dueFeesModelList: DueFeesHistory[];
  totalDueFeesObj: DueFees = new DueFees();
}
