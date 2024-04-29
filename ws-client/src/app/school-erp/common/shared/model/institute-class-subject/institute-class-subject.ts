export class InstituteClassSubject {

  oid: string;
  nameEn: string;
  nameBn: string;
  educationSubjectNameBn: string;
  educationSubjectNameEn: string;
  educationSubjectOid: string;
  instituteClassGroupOid: string;
  subjectCode: string;
  subjectType: string;
  status: string;
  instituteSessionOid: string;
  instituteOid: string;
  instituteClassOid: string;
  subjectTypeSelection: string;

  totalMarks: number = 0;
  mcqMarks: number = 0;
  writtenMarks: number = 0;
  practicalMarks: number = 0;
  vivaMarks: number = 0;

  value: boolean;

  preSelect: boolean;

  checkStatus: boolean = false;

}
