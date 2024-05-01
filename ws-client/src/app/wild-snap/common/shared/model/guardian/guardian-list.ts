import { PermanentAddress } from "../address/permanent-address";
import { PresentAddress } from "../address/present-address";

export class GuardianList {
  oid: string;
  loginId: string;
  guardianId: string;
  guardianNameEn: string;
  guardianNameBn: string;
  dateOfBirth: string;
  gender: string;
  religion: string;
  nationality: string;
  educationalQualification: string;
  bloodGroup: string;
  presentAddressJson: string;
  permanentAddressJson: string;
  mobileNo: string;
  email: string;
  fatherNameEn: string;
  fatherNameBn: string;
  fatherOccupation: string;
  fatherEmail: string;
  fatherContactNumber: string;
  motherNameEn: string;
  motherNameBn: string;
  motherOccupation: string;
  motherEmail: string;
  motherContactNumber: string;
  emergencyContactPerson: string;
  emergencyContactNo: string;
  imagePath: string;

  presentAddress: PresentAddress = new PresentAddress();
  permanentAddress: PermanentAddress = new PermanentAddress();

  nameEnglish: string;
  nameBangla: string;
}
