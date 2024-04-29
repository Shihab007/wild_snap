import { PermanentAddress } from "../../model/address/permanent-address";
import { PresentAddress } from "../../model/address/present-address";

export class AddNewTeacherRequestBody {

  oid: string;
  instituteOid: string;
  loginId: string;
  teacherNameEn: string;
  teacherNameBn: string;
  dateOfBirth: string;
  email: string;
  mobileNo: string;
  gender: string;
  religion: string;
  nationality: string;
  bloodGroup: string;
  educationalQualification: string;
  fatherNameEn: string;
  fatherNameBn: string;
  fatherOccupation: string;
  fatherContactNumber: string;
  fatherEmail: string;
  motherNameEn: string;
  motherNameBn: string;
  motherOccupation: string;
  motherContactNumber: string;
  motherEmail: string;
  emergencyContactPerson: string;
  emergencyContactNo: string;
  status: string;
  url: string;
  photoPath: string;
  photoUrl: string;

  presentAddress: PresentAddress = new PresentAddress();
  permanentAddress: PermanentAddress = new PermanentAddress();

}