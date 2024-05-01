import { PermanentAddress } from "src/app/wild-snap/common/shared/model/address/permanent-address";
import { PresentAddress } from "src/app/wild-snap/common/shared/model/address/present-address";

export class AdmissionFormRequestBody {

  // oid: string;

  // admissionId: string;

  // instituteOid: string;
  // instituteSessionOid: string;
  // instituteClassOid: string;
  // instituteClassGroupOid: string;
  // instituteShiftOid: string;
  // instituteVersionOid: string;
  // educationCurriculumOid: string;

  // applicantNameEn: string;
  // applicantNameBn: string;

  // dateOfBirth: string;
  // email: string;
  // mobileNo: string;
  // gender: string;
  // religion: string;
  // nationality: string;
  // bloodGroup: string;

  // fatherNameEn: string;
  // fatherNameBn: string;
  // fatherOccupation: number;
  // fatherContactNumber: string;
  // fatherEmail: string;

  // motherNameEn: string;
  // motherNameBn: string;
  // motherOccupation: string;
  // motherContactNumber: string;
  // motherEmail: string;

  // emergencyContactPerson: string;
  // emergencyContactNo: string;

  // status: string;
  // url: string;
  // photoPath: string;
  // photoUrl: string;

  // presentAddress: PresentAddress = new PresentAddress();
  // permanentAddress: PermanentAddress = new PermanentAddress();












  oid: string;
  admissionId: string;

  studentOid: string;
  studentId: string;

  instituteOid: string;
  instituteShiftOid: string;

  applicantNameEn: string;
  applicantNameBn: string;

  dateOfBirth: Date;
  email: string;
  mobileNo: string;
  gender: string;
  religion: string;
  nationality: string;
  bloodGroup: string;

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


  presentAddress: PresentAddress = new PresentAddress();
  permanentAddress: PermanentAddress = new PermanentAddress();


  // Code By Ishtiak

  presentAddressJson: string;
  permanentAddressJson: string;

  photoPath: string;
  url: string;
  photoUrl: string;
  status: string;

  instituteSessionOid: string;
  isnSessionOid: string;
  insSessNameEn: string;
  insSessNameBn: string;

  instituteClassOid: string;
  eduClassOid: string;
  eduClassNameEn: string;
  eduClassNameBn: string;

  instituteClassGroupOid: string;
  insClassGroupOid: string;
  insClassGroupNameEn: string;
  insClassGroupNameBn: string;

  instituteVersionOid: string;
  insVerOid: string;
  insVerNameEn: string;
  insVerNameBn: string;

  educationCurriculumOid: string;
  eduCuriOid: string;
  eduCuriNameEn: string;
  eduCuriNameBn: string;

  instituteShiftNameEn: string;
  instituteShiftNameBn: string;



  instituteClassSectionOid: string;
  instituteClassSectionNameEn: string;
  instituteClassSectionNameBn: string;

}