import { StudetAttendanceDetail } from "./studet-attendance-detail";

export class StudentAttendance {
  oid: string;
  date: string;
  attendanceDate: string;
  instituteOid: string;
  instituteSessionOid: string;
  instituteClassOid: string;
  instituteClassSectionOid: string;
  instituteClassGroupOid: string;
  instituteShiftOid: string;
  instituteVersionOid: string;
  teacherOid: string;
  educationSubjectOid: string;
  classPeriodOid: string;
  status: string;
  weekDayName: string;

  //My be need 

  // instituteOid: string;
  // instituteSessionOid: string;
  // instituteClassOid: string;
  // instituteClassSectionOid: string;
  // instituteClassGroupOid: string;
  // instituteShiftOid: string;
  // instituteVersionOid: string;
  // teacherOid: string;
  // classTextbookOid: string;
  // classPeriodOid: string;

  //My be need 

  instituteNameEn: string;
  instituteNameBn: string;
  sessionNameEn: string;
  sessionNameBn: string;
  classNameEn: string;
  classNameBn: string;
  sectionOid: String;
  sectionNameEn: string;
  sectionNameBn: string;
  groupNameEn: string;
  groupNameBn: string;
  shiftNameEn: string;
  shiftNameBn: string;
  versionNameEn: string;
  versionNameBn: string;
  teacherNameEn: string;
  teacherNameBn: string;
  textbookNameEn: string;
  subjectNameEn: string;
  subjectNameBn: string;
  textbookNameBn: string;
  periodNameEn: string;
  periodNameBn: string;

  studentAttendanceList: StudetAttendanceDetail[];


}
