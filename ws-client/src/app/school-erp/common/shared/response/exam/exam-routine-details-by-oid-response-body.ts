import { ExamRoutineDetailList } from "../../model/exam/exam-routine-detail";

export class ExamRoutineDetailsByOidResponseBody {
  oid: string;
  nameEn: string;
  nameBn: string;
  startDate: string;
  endDate: string;
  status: string;
  instituteOid: string;
  instituteSessionOid: string;
  createdBy: string;
  examRoutineList: ExamRoutineDetailList[];
}
