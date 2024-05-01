export class CreateContactRequestBody {
  oid: string;
  nameEn: string;
  nameBn: string;
  contactNo: string;
  email: string;
  address: string;
  instituteOid: string;

  contactGroupOidList: string[] = [];

}
