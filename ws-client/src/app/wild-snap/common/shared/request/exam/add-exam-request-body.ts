import { ExamClass } from "../../model/exam/exam-class";
import { ExamTime } from "../../model/exam/exam-time";


export class AddExamRequestBody {
  oid: string;
  nameEn: string;
  nameBn: string;
  instituteSessionOid: string;
  startDate: string;
  endDate: string;

  instituteOid: string;
  status: string;

  institutOid: string;
  sessionEn: string;
  sessionBn: string;
  sessionOid: string;
  createdBy: string;

  examTimeList: ExamTime[] = [];
  examClassList: ExamClass[] = [];

  oldTimeList: ExamTime[];
  oldClassList: ExamClass[];
}