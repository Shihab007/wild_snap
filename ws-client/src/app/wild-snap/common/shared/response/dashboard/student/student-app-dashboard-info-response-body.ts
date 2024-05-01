import { AppStudentAttendance } from "../../../model/attendance/app-student-attendance-list";
import { ClassListApp } from "../../../model/class/class-list-app";
import { ExamApp } from "../../../model/exam-app/exam-list-app";
import { AppVoucherInfo } from "../../../model/voucher-app/app-voucher-info";
import { VoucherApp } from "../../../model/voucher-app/voucher-app";

export class StudentAppDashboardInfoResponseBody {

  attendance: AppStudentAttendance;
  voucherInfo: AppVoucherInfo;
  examList: ExamApp[];
  voucherList: VoucherApp[];
  classeList: ClassListApp[];
}
