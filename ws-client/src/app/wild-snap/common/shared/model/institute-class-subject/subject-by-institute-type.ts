export class SubjectByInstituteType {
  oid: string;
  educationSubjectOid: string;
  educationSubjectNameEn: string;
  educationSubjectNameBn: string;
  subjectCode: string;
  subjectType: string;
  subjectTypeSelection: string;

  checkStatus: boolean;
  disableStatus: boolean;

  totalMarks: number = 0;
  mcqMarks: number = 0;
  writtenMarks: number = 0;
  practicalMarks: number = 0;
  vivaMarks: number = 0;

  status: string;
}
