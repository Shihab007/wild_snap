import { PermanentAddress } from "../../../model/address/permanent-address";
import { PresentAddress } from "../../../model/address/present-address";

export class GetPeopleByOidResponseBody {
  oid: string;
  instituteOid: string;
  peopleType: string;
  nameEn: string;
  nameBn: string;

  dateOfBirth: string;
  email: string;
  mobileNo: string;
  nationalIdNo: string;
  birthRegistrationNo: string;
  gender: string;
  religion: string;
  nationality: string;
  bloodGroup: string;

  accountsReceivable: number;
  accountsPayable: number;

  fatherNameEn: string;
  fatherNameBn: string;
  fatherOccupation: number;
  fatherContactNumber: string;
  fatherEmail: string;

  motherNameEn: string;
  motherNameBn: string;
  motherOccupation: string;
  motherContactNumber: string;
  motherEmail: string;

  presentAddressJson: string;
  permanentAddressJson: string;
  emergencyContactPerson: string;
  emergencyContactNo: string;

  status: string;
  url: string;
  photoPath: string;
  photoUrl: string;

  presentAddress: PresentAddress = new PresentAddress();
  permanentAddress: PermanentAddress = new PermanentAddress();
}
