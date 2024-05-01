import { RequestHeader } from "../../header/request-header";
import { StudentAttendance } from "../../model/attendance/student-attendance";

export class saveStudentAttendanceRequest{
    header: RequestHeader;
    body: StudentAttendance;
}