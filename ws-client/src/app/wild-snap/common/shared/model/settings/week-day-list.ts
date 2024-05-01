export class WeekDayList {
  oid: string;
  instituteOid: string;
  nameEn: string;
  nameBn: string;
  status: string;

  period: {
    classPeriodOid: string,
    classTextbookOid: string,
    teacherOid: string
  }[] = [];
}
