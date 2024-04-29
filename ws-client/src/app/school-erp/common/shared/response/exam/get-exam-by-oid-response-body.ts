import { ExamClass } from "../../model/exam/exam-class";
import { ExamSubject } from "../../model/exam/exam-subject";
import { SchoolExamClassTextBook } from "../../model/exam/exam-textbook-detail";
import { ExamTime } from "../../model/exam/exam-time";

export class GetExamByOidResponseBody {

  oid: string;
  nameEn: string;
  nameBn: string;
  startDate: string;
  endDate: string;
  examType: string;
  status: string;
  institutOid: string;
  sessionEn: string;
  sessionBn: string;
  sessionOid: string;
  instituteOid: string;
  instituteSessionOid: string;
  createdBy: string;
  termOid: string;

  examTimeList: ExamTime[];
  examClassList: ExamClass[];
  examTextBookList: SchoolExamClassTextBook[];
  examSubjectList: ExamSubject[];

  oldTimeList: ExamTime[];
  oldClassList: ExamClass[];


}
