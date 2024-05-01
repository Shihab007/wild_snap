import { StudentAttendanceDetail } from "../../model/student/student-attendance-list";

export class AttendanceListResponseBody {
  fromDate: string;
  toDate: string;
  attendanceDetailsList: StudentAttendanceDetail[];
}
