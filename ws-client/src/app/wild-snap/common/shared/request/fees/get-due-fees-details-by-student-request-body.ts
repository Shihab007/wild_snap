import { HeadCodes } from "../../model/fees/head-codes";

export class GetDueFeesDetailsByStudentRequestBody {
  instituteOid: string;
  instituteClassOid: string;
  sessionOid: string;
  studentId: string;
  studentOid: string;
  headCode: string;
  status: string;
  applicationTrackingId: string;

  headCodes: HeadCodes[];
}
