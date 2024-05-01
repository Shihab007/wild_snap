export class StudentListByExamSubject {

  oid: string;
  studentId: string;
  rollNumber: string;
  nameEn: string;
  nameBn: string;
  dateOfBirth: Date;
  email: string;
  mobileNo: string;
  gender: string;
  religion: string;
  bloodGroup: string;
  nationality: string;
  photoPath: string;
  photoUrl: string;

  //session
  sessionOid: string;
  sessionNameEn: string;
  sessionNameBn: string;

  //Class
  classOid: string;
  classNameEn: string;
  classNameBn: string;

  //Section
  sectionOid: string;
  sectionNameEn: string;
  sectionNameBn: string;

  //Shift
  shiftOid: string;
  shiftNameEn: string;
  shiftNameBn: string;

  //version
  versionOid: string;
  versionNameEn: string;
  versionNameBn: string;

  //Marks
  examResultMarksOid: string;
  examResultDetailOid: string;
  obtainedMarks: number;
  writtenMarks: number;
  mcqMarks: number;
  labMarks: number;
  vivaMarks: number;
  status: string;
}
