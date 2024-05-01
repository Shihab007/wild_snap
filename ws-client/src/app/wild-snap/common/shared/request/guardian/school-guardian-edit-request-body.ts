import { PermanentAddress } from "../../model/address/permanent-address";
import { PresentAddress } from "../../model/address/present-address";
import { GuardianStudent } from "../../model/guardian/guardian-student";

export class SchoolGuardianEditRequestBody {
  oid: string;
  loginId: string;
  guardianId: string;
  guardianNameEn: string;
  guardianNameBn: string;
  studentId: string;
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
  photoPath: string;
  photoUrl: string;
  createdBy: string;

  studentList: GuardianStudent[] = [];
  presentAddress: PresentAddress = new PresentAddress();
  permanentAddress: PermanentAddress = new PermanentAddress();
}
