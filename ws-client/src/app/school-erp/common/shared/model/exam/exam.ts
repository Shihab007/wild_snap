import { ExamTime } from "./exam-time";

export class Exam {
  nameEn: string;
  nameBn: string;
  examType: string;
  instituteSessionOid: string;
  startDate: string;
  endDate: string;
  examTimeList: ExamTime[] = [];

}