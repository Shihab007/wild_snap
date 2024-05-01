export class CreateRepeatedFeesRequestBody {
  instituteOid: string;
  instituteClassOid: string;
  sessionOid: string;
  remarks: string;
  createdBy: string;

  headCodes: string[] = []
}
