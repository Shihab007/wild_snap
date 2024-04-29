
export class AdmissionDueFeesCreateModel {



  applicationTrackingId: string;

  studentId: string;
  studentOid: string;

  instituteOid: string;
  instituteClassOid: string;
  sessionOid: string;

  createdBy: string;
  remarks: string;
  status: string;


  headCodes: string[] = [];

}