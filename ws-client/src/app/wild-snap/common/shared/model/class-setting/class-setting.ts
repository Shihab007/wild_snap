import { InstituteClassTerm } from "./institute-class-term";

export class InstituteClassSetting {
  oid: String;
  instituteOid: String;
  instituteVersionOid: String;
  instituteShiftOid: String;
  instituteSessionOid: String;
  instituteClassOid: String;
  instituteClassGroupOid: String;
  promotionOnResult: String;
  resultSetting: String;
  studentSubjectChange: String;
  groupChange: String;
  sectionChange: String;
  admission: String;
  numberOfTerm: number;
  status: String;
  finalExamContribution: number = 0;
  classTestContribution: number = 0;
  assignmentContribution: number = 0;
  attendanceContribution: number = 0;
  othersContribution: number = 0;
  createdBy: String;
  updatedBy: String;
  instituteClassTermList: InstituteClassTerm[] = [];
}