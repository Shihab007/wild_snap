import { GetTeacherAttendanceDetails } from "../../model/attendance/get-teacher-attendance-details";

export class GetTeacherAttendanceDetailsResponseBody {
  attendanceDate: Date;
  attendanceList: GetTeacherAttendanceDetails[] = [];
}