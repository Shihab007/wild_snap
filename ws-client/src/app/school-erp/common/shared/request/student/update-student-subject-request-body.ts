import { StudentSubject } from "../../model/student/student-subject";

export class UpdateStudentSubjectRequestBody {
  studentId: string;
  instituteSessionOid: string;
  instituteClassOid: string;
  createdBy: string;

  classSubjects: StudentSubject[];
}
