import { EducationBoardEntity } from "../../model/education/education-board-entity";
import { EducationClassEntity } from "../../model/education/education-class-entity";
import { EducationClassLevelEntity } from "../../model/education/education-class-level-entity";
import { EducationCurriculumEntity } from "../../model/education/education-curriculum-entity";
import { EducationGradingSystemDetailEntity } from "../../model/education/education-grading-system-detail-entity";
import { EducationGradingSystemEntity } from "../../model/education/education-grading-system-entity";
import { EducationGroupEntity } from "../../model/education/education-group-entity";
import { EducationMediumEntity } from "../../model/education/education-medium-entity";
import { EducationSessionEntity } from "../../model/education/education-session-entity";
import { EducationShiftEntity } from "../../model/education/education-shift-entity";
import { EducationSystemEntity } from "../../model/education/education-system-entity";
import { EducationTextbookEntity } from "../../model/education/education-textbook-entity";
import { EducationTypeEntity } from "../../model/education/education-type-entity";
import { EducationVersionEntity } from "../../model/education/education-version-entity";

export class GetEducationInfoResponseBody {


  educationBoardList: EducationBoardEntity[];
  educationCurriculumList: EducationCurriculumEntity[];
  educationMediumList: EducationMediumEntity[];
  educationSystemList: EducationSystemEntity[];
  educationClassList: EducationClassEntity[];
  educationClassLevelList: EducationClassLevelEntity[];
  educationGradingSystemList: EducationGradingSystemEntity[];
  educationGradingSystemDetailList: EducationGradingSystemDetailEntity[];
  educationGroupList: EducationGroupEntity[];
  educationSessionList: EducationSessionEntity[];
  educationShiftList: EducationShiftEntity[];
  educationTextbookList: EducationTextbookEntity[];
  educationTypeList: EducationTypeEntity[] = [];
  educationVersionList: EducationVersionEntity[];



}
