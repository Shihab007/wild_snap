import { ClassRoutineByDay } from "../../model/class-routine/class-routine-by-day";

export class ExistingClassRoutineDetailsByOidResponseBody {
  oid: string;
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
  classNameEn: string;
  classNameBn: string;

  classRoutineList: ClassRoutineByDay[];
}
