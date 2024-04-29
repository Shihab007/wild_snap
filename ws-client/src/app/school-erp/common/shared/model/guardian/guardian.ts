import { PermanentAddress } from "../address/permanent-address";
import { PresentAddress } from "../address/present-address";

export class Guardian {
  oid: string;
  loginId: string;
  studentId: string;
  guardianId: string;
  nameEn: string;
  nameBn: string;
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
  phoneNumber: string;
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
  emergencyContactName: string;
  emergencyContactNo: string;
  imagePath: string;
  url: string;
  photoPath: string;
  photoUrl: string;
  status: string;

  presentAddress: PresentAddress = new PresentAddress();
  permanentAddress: PermanentAddress = new PermanentAddress();
}

