import { InstituteClassEntity } from "../../model/institute/institute-class-entity";
import { InstituteClassGroupEntity } from "../../model/institute/institute-class-group-entity";
import { InstituteClassLevelEntity } from "../../model/institute/institute-class-level-entity";
import { InstituteGradingSystemDetailsEntity } from "../../model/institute/institute-grading-system-details-entity";
import { InstituteGradingSystemEntity } from "../../model/institute/institute-grading-system-entity";
import { InstituteShiftEntity } from "../../model/institute/institute-shift-entity";
import { InstituteTextbookEntity } from "../../model/institute/institute-textbook-entity";
import { InstituteTypeEntity } from "../../model/institute/institute-type-entity";
import { InstituteVersionEntity } from "../../model/institute/institute-version-entity";

export class GetInstituteByOidResponseBody {

  oid: String;
  nameEn: String;
  nameBn: String;
  instituteEmail: String;
  instituteContactNumber: String;
  instituteAddress: String;
  instituteAddressBn: String;
  instituteCode: String;
  type: String;
  districtNameEn: String;
  districtNameBn: String;
  boardNameEn: String;
  boardNameBn: String;
  systemNameEn: String;
  systemNameBn: String;
  curriculumNameEn: String;
  curriculumNameBn: String;
  status: string;
  logoUrl: string;
  logoPath: string;

  instituteShiftList: InstituteShiftEntity[];
  instituteVersionList: InstituteVersionEntity[];
  instituteTypeList: InstituteTypeEntity[];
  instituteGradingSystemList: InstituteGradingSystemEntity[];
  instituteClassList: InstituteClassEntity[];
  instituteClassGroupList: InstituteClassGroupEntity[];
  instituteClassLevelList: InstituteClassLevelEntity[];
  gradingSystemDetailsList: InstituteGradingSystemDetailsEntity[];
  instituteTextbookList: InstituteTextbookEntity[];




}
