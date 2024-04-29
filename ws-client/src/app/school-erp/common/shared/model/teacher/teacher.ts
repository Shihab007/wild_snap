import { PermanentAddress } from "../address/permanent-address";
import { PresentAddress } from "../address/present-address";

export class Teacher {
  oid: string;
  loginId: string;
  teacherId: string;
  instituteOid: string;
  instituteNameEn: string;
  instituteNameBn: string;
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
  imagePath: string;
  url: string;
  status: string;

  presentAddress: PresentAddress = new PresentAddress();
  permanentAddress: PermanentAddress = new PermanentAddress();
}
