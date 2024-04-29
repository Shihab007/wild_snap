import { InstituteGradingSystemEntity } from "../institute/institute-grading-system-entity";

export class ExamClass {

  nameEn: string;
  nameBn: string;
  check = false;

  oid: string;
  examOid: string;
  instituteClassOid: string;
  gradingSystemOid: string;
  noOfStudent: number;
  status: string;
  gradingNameEn: string;
  gradingNameBn: string;

  sectionNameEn: string;
  sectionNameBn: string;
  shiftNameEn: string;
  shiftNameBn: string;

  gradingSystemList: InstituteGradingSystemEntity[] = [];
}






