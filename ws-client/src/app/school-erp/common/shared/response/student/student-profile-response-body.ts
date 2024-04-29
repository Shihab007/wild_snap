import { PermanentAddress } from "../../model/address/permanent-address";
import { PresentAddress } from "../../model/address/present-address";
import { InstituteClassSubject } from "../../model/institute-class-subject/institute-class-subject";
import { StudentClassSubject } from "./student-class-subject";

export class StudentProfileResponseBody {
  studentOid: string;
  oid: string;
  loginId: string;
  nameEn: string;
  guardianOid: string;
  studentId: string;
  guardianId: string;
  studentNameEn: string;
  studentNameBn: string;
  nameBn: string;
  instituteOid: string;
  instituteNameEn: string;
  instituteNameBn: string;
  sectionOid: string;
  sectionNameEn: string;
  sectionNameBn: string;
  versionOid: string;
  versionNameEn: string;
  versionNameBn: string;
  classOid: string;
  classNameEn: string;
  classNameBn: string;
  sessionOid: string;
  sessionNameEn: string;
  sessionNameBn: string;
  sessionEn: string;
  sessionBn: string;
  sectionEn: string;
  sectionBn: string;
  classGroupOid: string;
  classGroupEn: string;
  classGroupBn: string;
  shiftOid: string;
  shiftEn: string;
  shiftBn: string;
  versionEn: string;
  versionBn: string;
  curriculumOid: string;
  curriculumEn: string;
  curriculumBn: string;
  dateOfBirth: string;
  gender: string;
  religion: string;
  rollNo: string;
  nationality: string;
  className: string;
  bloodGroup: string;
  presentAddressJson: string;
  permanentAddressJson: string;
  phoneNumber: string;
  email: string;
  fatherNameEn: string;
  fatherNameBn: string;
  fatherContactNumber: string;
  fatherEmail: string;
  fatherNidNo: string;
  fatherNidFilePath: string;
  fatherNidFileUrl: string;
  fatherOccupation: string;
  motherNameEn: string;
  motherNameBn: string;
  motherContactNumber: string;
  motherEmail: string;
  motherNidNo: string;
  motherNidFilePath: string;
  motherNidFileUrl: string;
  motherOccupation: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  imagePath: string;
  url: string;
  loginOid: string;
  status: string;
  birthCertificateNo: string;
  dateOfIssue: string;
  registrationNo: string;
  birthCertificateFilePath: string;
  birthCertificateFileUrl: string;
  characterCertificateFilePath: string;
  characterCertificateFileUrl: string;
  testimonialFilePath: string;
  testimonialFileUrl: string;
  transferCertificateFilepath: string;
  transferCertificateFileUrl: string;

  presentAddress: PresentAddress = new PresentAddress();
  permanentAddress: PermanentAddress = new PermanentAddress();

  classSubjectList: StudentClassSubject[] = [];
  instituteClassSubjectList: InstituteClassSubject[] = [];
}