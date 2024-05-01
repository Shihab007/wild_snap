export class StudentList {

  oid: string;//student oid >generated
  studentId: string;//generated

  loginId: string;//login_id  >from ui
  rollNumber: string;//roll_number  >from ui	




  //institute
  instituteClassSectionOid: string;//institute_class_section_oid  >from ui
  instituteOid: string;//institute_oid
  instituteSessionOid: string;//institue_session_oid
  instituteClassOid: string;//institute_class_oid
  instituteClassGroupOid: string;//institute_class_group_oid
  instituteShiftOid: string;//institute_shift_oid
  instituteVersionOid: string;//institute_version_oid
  educationCurriculumOid: string;//education_curriculum_oid


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
  presentAddress: string;//from ui
  permanentAddress: string;//from ui

  //emergency contact
  emergencyContactPerson: string;//emergency_contact_person
  emeregencyContactNo: string;//emergency_contact_no

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

  //attendance
  attendanceStatus: string;
  presentValue: boolean;
  absentValue: boolean;
  isPresent: string;
  classNameEn: string;
  classNameBn: string;
  instituteClassSectionNameEn: string;
  instituteClassSectionNameBn: string;
  classGroupNameEn: string;
  classGroupNameBn: string;

}
