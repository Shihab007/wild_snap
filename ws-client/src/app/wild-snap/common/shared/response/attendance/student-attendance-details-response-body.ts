import { StudentAttendanceDetails } from "./student-attendance-details";

export class StudentAttendanceDetailsResponseBody {
  oid: String;
  instituteSessionOid: string;
  attendanceDate: Date;
  instituteNameEn: String;
  instituteNameBn: String;
  sessionNameEn: String;
  sessionNameBn: String;
  classNameEn: String;
  classNameBn: String;
  sectionNameEn: String;
  sectionNameBn: String;
  groupNameEn: String;
  groupNameBn: String;
  shiftNameEn: String;
  shiftNameBn: String;
  versionNameEn: String;
  versionNameBn: String;
  teacherNameEn: String;
  teacherNameBn: String;
  textbookNameEn: String;
  textbookNameBn: String;
  periodNameEn: String;
  periodNameBn: String;


  studentAttendanceDetails: StudentAttendanceDetails[];
}