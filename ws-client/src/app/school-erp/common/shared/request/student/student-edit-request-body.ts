import { PermanentAddress } from "../../model/address/permanent-address";
import { PresentAddress } from "../../model/address/present-address";
import { InstituteClassSubject } from "../../model/institute-class-subject/institute-class-subject";
import { StudentClassSubject } from "../../response/student/student-class-subject";

export class StudentEditRequestBody {
  oid: string;
  loginId: string;
  studentId: string;
  nameEn: string;
  nameBn: string;
  rollNo: string;
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

  classSubjectList: StudentClassSubject[] = [];
  instituteClassSubjectList: InstituteClassSubject[] = [];
}