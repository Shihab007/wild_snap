import { TeacherRoutineDetails } from "../../model/class-routine/teacher-class-routine-detail";

export class ClassRoutineDetailsByTeacherOidResponseBody {
  oid: string;

  teacherNameEn: string;
  teacherNameBn: string;

  teacherId: string;
  teacherDateOfBirth: string;

  routineDetails: TeacherRoutineDetails[];
}
