import { PeriodInfo } from "../class-routine/period-info";

export class StudentAttendanceDetail {
  oid: string;
  studentRoll: string;
  status: string;
  studentNameEn: string;
  studentNameBn: string;
  attendanceDate: string;
  periodNameEn: string;
  periodNameBn: string;
  rollNumber: string;
  periodOid: string;

  period: PeriodInfo[];
}
