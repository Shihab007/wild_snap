import { PermanentAddress } from "../address/permanent-address";
import { PresentAddress } from "../address/present-address";
import { GuardianStudent } from "./guardian-student";

export class GuardianProfile {
  oid: string;
  loginId: string;
  guardianId: string;
  nameEn: string;
  nameBn: string;
  dateOfBirth: string;
  gender: string;
  religion: string;
  nationality: string;
  educationalQualification: string;
  bloodGroup: string;
  presentAddressJson: string;
  permanentAddressJson: string;
  phoneNumber: string;
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
  emergencyContactName: string;
  emergencyContactNumber: string;
  emergencyContactNo: string;
  imagePath: string;
  url: string;
  status: string;

  studentList: GuardianStudent[] = [];
  presentAddress: PresentAddress = new PresentAddress();
  permanentAddress: PermanentAddress = new PermanentAddress();
}
