import { ExamInfo } from "../../model/exam-routine/exam-info";
import { ExamRoutine } from "../../model/exam-routine/exam-routine";
import { ExamTime } from "../../model/exam/exam-time";

export class ExamRoutineByOidResponseBody {

  oid: string;
  nameEn: string;
  nameBn: string;
  startDate: string;
  endDate: string;
  status: string;
  instituteOid: string;
  instituteSessionOid: string;
  createdBy: string;
  examTimeList: ExamTime[];
  examRoutineList: ExamRoutine[];
  examInfoList: ExamInfo[];
  noOfStudent: number;

}
