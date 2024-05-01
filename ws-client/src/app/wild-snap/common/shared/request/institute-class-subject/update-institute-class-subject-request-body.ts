import { UpdateInstituteClassSubject } from "../../model/institute-class-subject/update-institute-class-subject";

export class UpdateInstituteClassSubjectRequestBody {
  instituteOid: string;
  instituteSessionOid: string;
  instituteClassOid: string;
  classSubjects: UpdateInstituteClassSubject[] = [];
}
