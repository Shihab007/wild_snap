import { PermanentAddress } from "../../model/address/permanent-address";
import { PresentAddress } from "../../model/address/present-address";
import { GuardianStudent } from "../../model/guardian/guardian-student";

export class GuardianProfileResponseBody {
  oid: string;
  loginId: string;
  guardianId: string;
  studentId: string;
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
  mobileNo: string;
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
  photoPath: string;
  photoUrl: string;
  status: string;
  createdBy: string;
  instituteOid: string;

  studentList: GuardianStudent[] = [];
  presentAddress: PresentAddress = new PresentAddress();
  permanentAddress: PermanentAddress = new PermanentAddress();
}