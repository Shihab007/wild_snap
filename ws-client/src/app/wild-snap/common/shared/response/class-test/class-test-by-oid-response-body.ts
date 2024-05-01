import { ClassTestMark } from "../../model/class-test/class-test-mark";

export class ClassTestByOidResponseBody {
  oid: string;
  nameEn: string;
  nameBn: string;
  descriptionEn: string;
  descriptionBn: string;
  contributionCount: string;
  ctDate: Date;
  ctTime: string;
  totalMark: number;
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
  teacherId: string;
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

  classTestMark: ClassTestMark[] = [];
}
