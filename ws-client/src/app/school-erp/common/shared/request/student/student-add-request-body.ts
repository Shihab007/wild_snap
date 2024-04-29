import { PermanentAddress } from "../../model/address/permanent-address";
import { PresentAddress } from "../../model/address/present-address";
import { InstituteClassSubject } from "../../model/institute-class-subject/institute-class-subject";
import { TextbookList } from "../../model/textbook/textbook-list";

export class StudentAddRequestBody {


  //login
  fatherLoginId: string;//>from ui
  motherLoginId: string;//>from ui

  oid: string;//student oid >generated
  studentId: string = "";//generated
  studentOid: string = "";

  loginId: string;//login_id  >from ui
  rollNumber: string;//roll_number  >from ui	

  admissionId: string;//from ui


  //institute
  instituteClassSectionOid: string;//institute_class_section_oid  >from ui
  instituteOid: string;//institute_oid
  instituteSessionOid: string;//institue_session_oid
  instituteClassOid: string;//institute_class_oid
  instituteClassGroupOid: string;//institute_class_group_oid
  instituteShiftOid: string;//institute_shift_oid
  instituteVersionOid: string;//institute_version_oid
  educationCurriculumOid: string;//education_curriculum_oid


  //emergency contact
  emergencyContactPerson: string;//emergency_contact_person
  emeregencyContactNo: string;//emergency_contact_no

  //personal info
  nameEn: string;//from ui
  nameBn: string;//from ui
  dateOfBirth: string;//from ui
  gender: string;//from ui
  religion: string;//from ui
  nationality: string;//from ui
  bloodGroup: string;//from ui
  phoneNumber: string;//from ui
  email: string;//from ui

  //address

  presentAddress: PresentAddress = new PresentAddress();
  permanentAddress: PermanentAddress = new PermanentAddress();
  presentAddressJson: string;//from ui
  permanentAddressJson: string;//from ui


  //mother info
  fatherNameEn: string;//from ui
  fatherNameBn: string;//from ui
  fatherOccupation: string;//from ui
  fatherEmail: string;//from ui
  fatherContactNumber: string;//from ui

  //father info
  motherNameEn: string;//from ui    
  motherNameBn: string;//from ui
  motherOccupation: string;//from ui
  motherEmail: string;//from ui
  motherContactNumber: string;//from ui

  //photo and status
  photoPath: string;//from ui
  photoUrl: string;//from ui
  status: string;//from ui

  textbookList: TextbookList[] = [];
  instituteClassSubjectList: InstituteClassSubject[] = [];


}