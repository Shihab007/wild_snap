import { SaveClassSubject } from "../../model/institute-class-subject/save-class-subject";

export class CreateInsituteClassSubjectRequestBody {
  instituteSessionOid: string;
  instituteOid: string;
  instituteClassOid: string;

  classSubjects: SaveClassSubject[];
}
