import { ExamRoutine } from "../../model/exam-routine/exam-routine";

export class ExamRoutineRequestBody {
  examOid: string;
  examRoutineList: ExamRoutine[];
}
