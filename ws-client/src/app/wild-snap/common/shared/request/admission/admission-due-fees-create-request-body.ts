import { AdmissionDueFeesCreateModel } from "../../model/admission/admission-dew-fees-create-model";


export class AdimissionDueFeesCreateRequestBody {




  applicationTrackingId: string;

  instituteOid: string;
  instituteClassOid: string;
  sessionOid: string;

  createdBy: string = "kp";
  remarks: string = "";
  status: string;

  studentId: string = "";
  studentOid: string = "";

  headCodes: string[] = [];
  dueFeesCreateModel: AdmissionDueFeesCreateModel;

}