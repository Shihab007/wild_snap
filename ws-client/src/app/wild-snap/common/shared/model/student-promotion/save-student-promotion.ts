import { StudentResult } from "./student-result";


export class SaveStudentPromotion {
  oid: string;
  examOid: String;
  instituteOid: string;
  instituteSessionOid: string;
  instituteClassOid: string;
  instituteClassGroupOid: string;

  //promoted to data
  nextInstituteSessionOid: string;
  nextInstituteClassOid: string;
  nextInstituteClassGroupOid: string;
  nextInstituteClassSectionOid: string;
  

  failedStudentInstituteSessionOid: string;
  failedStudentInstituteClassOid: string;
  failedStudentInstituteClassGroupOid: string;
  failedStudentInstituteClassSectionOid: string;

  instituteClassSectionOid: string;
  instituteShiftOid: string;
  instituteVersionOid: string;
  educationCurriculumOid: string;
  status: string;
  createdBy: string;

  studentList: StudentResult[] = [];

}
