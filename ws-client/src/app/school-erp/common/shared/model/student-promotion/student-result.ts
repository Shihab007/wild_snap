import { AdmissionFeesList } from "../../response/fees/admission-fees/admission-fees-list";
import { ClassGroupDetails } from "../class-group/class-group-details";
import { InstituteClassSectionEntity } from "../institute/institute-class-section-entity";
import { ClassSubjectList } from "../subject/class-subject-list";

export class StudentResult {

  //promoted session info
  nextInstituteClassSectionOid: String;
  nextRollNumber: String;
  nextInstituteSessionOid: String;
  nextInstituteClassOid: String;
  nextInstituteClassGroupOid: String;


  //old session info
  totalObtainedMarks: number;
  fullMarks: number;
  rollNumber: string;

  //institute
  instituteClassSectionOid: string;
  instituteOid: string;
  instituteSessionOid: string;
  instituteClassOid: string;
  instituteClassGroupOid: string;
  instituteShiftOid: string;
  instituteVersionOid: string;
  educationCurriculumOid: string;


  oid: string;
  studentId: string;
  loginId: string;
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


  //photo and status
  photoPath: string;//from ui
  photoUrl: string;//from ui
  status: string;//from ui

  //attendance
  // attendanceStatus: string;
  // presentValue: boolean;
  // absentValue: boolean;
  // isPresent: string;
  classNameEn: string;
  classNameBn: string;
  instituteClassSectionNameEn: string;
  instituteClassSectionNameBn: string;
  classGroupNameEn: string;
  classGroupNameBn: string;




  promotionStatus: string;
  classSubjectList: ClassSubjectList[] = [];
  classSubjectCount: number;
  feesSettingsList: AdmissionFeesList[] = [];
  totalFeesCount: number;
  classGroupList: ClassGroupDetails[] = [];

  sectionList: InstituteClassSectionEntity[] = [];
}
