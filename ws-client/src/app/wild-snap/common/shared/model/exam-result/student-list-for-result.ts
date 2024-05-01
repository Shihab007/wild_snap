import { ResultMarksListForStudent } from "./result-marks-list-for-student";

export class StudentListForResult {
  studentOid: string;
  studentNameEn: string;
  studentNameBn: string;
  studentId: string;
  classOid: string;
  classNameEn: string;
  classNameBn: string;
  sectionOid: string;
  sectionNameEn: string;
  sectionNameBn: string;
  shiftOid: string;
  shiftNameEn: string;
  shiftNameBn: string;
  versionOid: string;
  versionNameEn: string;
  versionNameBn: string;
  gradingOid: string;
  gradingNameEn: string;
  gradingNameBn: string;

  resultMarksList: ResultMarksListForStudent[];
}