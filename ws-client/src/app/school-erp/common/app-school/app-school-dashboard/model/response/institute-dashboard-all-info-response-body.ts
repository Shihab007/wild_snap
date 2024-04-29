import { AdmissionStatusInfo } from "../models/admission-status-info";
import { DashboardFeesInfo } from "../models/dashboard-fees-info";
import { DashboardNoticeInfo } from "../models/dashboard-notice-info";
import { ExamResultInfo } from "../models/exam-result-info";
import { ExpenseRevenueInfo } from "../models/expense-revenue-info";
import { NumberCount } from "../models/number-count";
import { StudentAttendanceInfo } from "../models/student-attendance-info";
import { StudentBirthdayInfo } from "../models/student-birthday-info";
import { TeacherAttendanceInfo } from "../models/teacher-attendance-info";
import { TeacherBirthdayInfo } from "../models/teacher-birthday-info";

export class InstituteDashboardAllInfoResponseBody {
  admissionInfo: AdmissionStatusInfo;
  count: NumberCount;
  feesInfo: DashboardFeesInfo;
  noticeInfo: DashboardNoticeInfo;
  studentAttendanceInfo: StudentAttendanceInfo;
  studentBirthdayInfo: StudentBirthdayInfo;
  teacherAttendanceInfo: TeacherAttendanceInfo;
  teacherBirthdayInfo: TeacherBirthdayInfo;
  examResultInfo: ExamResultInfo;
  expenseRevenueInfo: ExpenseRevenueInfo;
}
