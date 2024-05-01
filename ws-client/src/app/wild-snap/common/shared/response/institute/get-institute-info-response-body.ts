import { InstituteClassEntity } from "../../model/institute/institute-class-entity";
import { InstituteClassGroupEntity } from "../../model/institute/institute-class-group-entity";
import { InstituteClassSectionEntity } from "../../model/institute/institute-class-section-entity";
import { InstituteGradingSystemEntity } from "../../model/institute/institute-grading-system-entity";
import { InstituteSessionEntity } from "../../model/institute/institute-session-entity";
import { InstituteShiftEntity } from "../../model/institute/institute-shift-entity";
import { InstituteTeacherEntity } from "../../model/institute/institute-teacher-entity";
import { InstituteVersionEntity } from "../../model/institute/institute-version-entity";

export class GetInstituteInfoResponseBody {

  oid: string;
  nameEn: string;
  nameBn: string;
  logoPath: string;
  logoUrl: string;
  districtOid: string;
  educationBoardOid: string;
  educationSystemOid: string;
  educationCurriculumOid: string;
  weekDayName: string;
  // shiftList: DataList[];
  // classList: ExamClass[];
  // sessionList: DataList[];
  // versionList: DataList[];
  // sectionList: InstituteClassSection[];


  shiftList: InstituteShiftEntity[];
  classList: InstituteClassEntity[];
  sessionList: InstituteSessionEntity[];
  versionList: InstituteVersionEntity[];
  sectionList: InstituteClassSectionEntity[];
  gradingSystemList: InstituteGradingSystemEntity[];
  teacherList: InstituteTeacherEntity[];
  groupList: InstituteClassGroupEntity[];

}
