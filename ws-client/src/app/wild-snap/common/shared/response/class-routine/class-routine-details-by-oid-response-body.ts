import { RoutineDetails } from "../../model/class-routine/class-routine-detail";

export class ClassRoutineDetailsByOidResponseBody {
  Oid: string;
  Status: string;

  instituteOid: string;
  instituteNameEn: string;
  instituteNameBn: string;

  instituteShiftOid: string;
  instituteShiftNameEn: string;
  instituteShiftNameBn: string;

  instituteSessionOid: string;
  instituteSessionNameEn: string;
  instituteSessionNameBn: string;

  instituteClassOid: string;

  instituteClassSectionOid: string;
  instituteClassSectionNameEn: string;
  instituteClassSectionNameBn: string;

  instituteClassGroupOid: string;
  instituteClassGroupNameEn: string;
  instituteClassGroupNameBn: string;

  instituteVersionOid: string;
  instituteVersionNameEn: string;
  instituteVersionNameBn: string;

  educationClassOid: string;
  educationClassNameEn: string;
  educationClassNameBn: string;

  routineDetails: RoutineDetails[];
}
