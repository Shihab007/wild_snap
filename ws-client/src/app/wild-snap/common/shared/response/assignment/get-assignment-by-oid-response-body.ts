import { AssignmentMark } from "../../model/assignment/assignment-mark";

export class GetAssignmentByOidResponseBody {
  oid: string;
  nameEn: string;
  nameBn: string;
  descriptionEn: string;
  descriptionBn: string;
  contributionCount: string;
  assignedDate: Date;
  submissionDate: Date;
  totalMark: number;
  teacherId: number;
  instituteClassSubjectOid: string;
  instituteClassSubjectNameEn: string;
  instituteClassSubjectNameBn: string;
  instituteSessionOid: string;
  instituteClassSessionNameEn: string;
  instituteClassSessionNameBn: string;
  instituteVersionOid: string;
  instituteVersionNameEn: string;
  instituteVersionNameBn: string;
  instituteShiftOid: string;
  instituteShiftNameEn: string;
  instituteShiftNameBn: string;
  instituteClassOid: string;
  instituteClassNameEn: string;
  instituteClassNameBn: string;
  instituteClassSectionOid: string;
  instituteClassSectionNameEn: string;
  instituteClassSectionNameBn: string;
  status: string;
  educationSubjectOid: string;
  educationSubjectNameEn: string;
  educationSubjectNameBn: string;
  termOid: string;
  termNameEn: string;
  termNameBn: string;
  instituteOid: string;
  instituteClassGroupOid: string;
  instituteClassGroupNameEn: string;
  instituteClassGroupNameBn: string;



  assignmentMarkList: AssignmentMark[] = [];

}



