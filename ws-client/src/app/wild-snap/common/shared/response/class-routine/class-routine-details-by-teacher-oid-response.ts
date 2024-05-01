import { ResponseHeader } from "src/app/login/shared/model/keycloak-user-info/Header/response-header";
import { TeacherClassRoutine } from "../../model/class-routine/teacher-class-routine";

export class ClassRoutineDetailsByTeacherOidResponse {
  header: ResponseHeader;
  body: TeacherClassRoutine;
}
