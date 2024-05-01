import { ExamTime } from "./exam-time";

export class ExamTextbookDetail {

  oid: string;
  examOid: string;
  nameEn: string;
  nameBn: string;
  startDate: string;
  endDate: string;
  institutOid: string;
  instituteSessionOid: string;
  status: string;
  sessionNameEn: string;
  sessionNameBn: string;

  examTimeList: ExamTime[];
  examClassList: SchoolExamClass[];

}

export class SchoolExamClass {

  oid: string;
  examClassOid: string;
  nameEn: string;
  nameBn: string;
  noOfStudent: number;
  textBookList: SchoolExamClassTextBook[];
  examSubjects: SchoolExamBook[];

}

export class SchoolExamClassTextBook {

  oid: string;
  nameEn: string;
  nameBn: string;
  examDate: string;
  examOid: string;
  examClassOid: string;
  examTimeOid: string;
  classTextbookOid: string;
  noOfStudent: number;
  totalMarks: number;
  status: string;
  versionOid: string;
  versionNameEn: string;
  versionNameBn: string;
  instituteClassOid: string;
  subjectCode: string;

}

export class SchoolExamBook {

  oid: string;
  nameEn: string;
  nameBn: string;
  subjectCode: string;
  totalMarks: number;
  examDate: string;
  noOfStudent: number;
  examTimeOid: string;
  educationSubjectOid: string;
  numberOfStudent: string;

}