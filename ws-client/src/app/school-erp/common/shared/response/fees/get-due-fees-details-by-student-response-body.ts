import { DueFees } from "../../model/fees/due-fees";
import { DueFeesHistory } from "../../model/fees/due-fees-history";

export class GetDueFeesDetailsByStudentResponseBody {
  instituteOid: string;
  instituteClassOid: string;
  studentId: string;
  studentOid: string;

  dueFees: DueFees[];
  dueFeesHistory: DueFeesHistory[];
  headCodeNamesEn: string[];
  headCodeNamesBn: string[];

  totalDueAmount: number;
  totalPaidAmount: number;
  totalPayableAmount: number;
}
