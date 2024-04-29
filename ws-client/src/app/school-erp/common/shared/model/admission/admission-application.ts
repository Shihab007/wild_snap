import { PermanentAddress } from "../address/permanent-address";
import { PresentAddress } from "../address/present-address";

export class AdmissionApplication {

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
