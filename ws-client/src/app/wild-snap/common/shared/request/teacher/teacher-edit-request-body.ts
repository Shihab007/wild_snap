import { PermanentAddress } from "../../model/address/permanent-address";
import { PresentAddress } from "../../model/address/present-address";

export class TeacherEditRequestBody {
  oid: string;
  loginId: string;
  teacherId: string;
  nameEn: string;
  nameBn: string;
  dateOfBirth: string;
  gender: string;
  religion: string;
  nationality: string;
  bloodGroup: string;
  presentAddressJson: string;
  permanentAddressJson: string;
  presentAddress: PresentAddress;
  permanentAddress: PermanentAddress;
  phoneNumber: string;
  email: string;
  fatherNameEn: string;
  fatherNameBn: string;
  fatherContactNumber: string;
  fatherEmail: string;
  fatherOccupation: string;
  motherNameEn: string;
  motherNameBn: string;
  motherContactNumber: string;
  motherEmail: string;
  motherOccupation: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  imagePath: string;
  url: string;
}