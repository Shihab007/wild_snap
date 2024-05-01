import { StudentListForResult } from "../../model/exam-result/student-list-for-result";

export class ExamResultDetailByOidResponseBody {
  examOid: string;
  examNameEn: string;
  examNameBn: string;
  instituteOid: string;
  instituteNameEn: string;
  instituteNameBn: string;
  sessionOid: string;
  sessionNameEn: string;
  sessionNameBn: string;
  classOid: string;
  classNameEn: string;
  classNameBn: string;
  classGroupNameEn: string;
  classGroupNameBn: string;
  sectionOid: string;
  sectionNameEn: string;
  sectionNameBn: string;
  shiftOid: string;
  shiftNameEn: string;
  shiftNameBn: string;
  versionOid: string;
  versionNameEn: string;
  versionNameBn: string;
  status: string;

  studentList: StudentListForResult[];
}