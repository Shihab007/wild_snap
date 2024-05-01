import { RoutineDetails } from "./class-routine-detail";

export class ClassRoutine {
  oid: string;
  instituteOid: string;
  instituteSessionOid: string;
  instituteClassOid: string;
  instituteClassGroupOid: string;
  instituteClassSectionOid: string;
  instituteShiftOid: string;
  instituteVersionOid: string;
  status: string;

  instituteNameEn: string;
  instituteNameBn: string;

  classNameEn: string;
  classNameBn: string;

  instituteShiftNameEn: string;
  instituteShiftNameBn: string;


  instituteSessionNameEn: string;
  instituteSessionNameBn: string;


  instituteClassSectionNameEn: string;
  instituteClassSectionNameBn: string;

  instituteClassGroupNameEn: string;
  instituteClassGroupNameBn: string;

  instituteVersionNameEn: string;
  instituteVersionNameBn: string;

  routineDetails: RoutineDetails[];
  routineDetailsOidList: string[] = [];
}
