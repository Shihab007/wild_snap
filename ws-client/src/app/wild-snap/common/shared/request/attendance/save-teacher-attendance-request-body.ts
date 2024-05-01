import { TeacherAttendanceDetails } from "../../model/attendance/teacher-attendance-details";

export class SaveTeacherAttendanceRequestBody {
  attendanceOid: string;
  attendanceDate: string;
  instituteOid: string;
  attendanceDetails: TeacherAttendanceDetails[] = [];
}

