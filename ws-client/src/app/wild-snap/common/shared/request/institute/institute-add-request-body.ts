import { EducationSessionEntity } from "../../model/education/education-session-entity";
import { EducationShiftEntity } from "../../model/education/education-shift-entity";
import { EducationTypeEntity } from "../../model/education/education-type-entity";
import { EducationVersionEntity } from "../../model/education/education-version-entity";

export class InstituteAddRequestBody {


  oid: String;
  nameEn: String;
  nameBn: String;
  instituteEmail: String;
  instituteContactNumber: String;
  districtOid: String;
  thanaOid: String;
  educationBoardOid: String;
  instituteAddress: String;
  instituteAddressBn: String;
  instituteCode: String;
  eiinNumber: String;
  logoPath: String;
  logoUrl: String;
  // instituteShiftOid: String;
  educationMediumOid: String;
  educationCurriculumOid: String;
  educationSystemOid: String;
  // educationTypeOid: String;
  // educationGradingSystemOid: String;
  loginId: String;
  userNameEn: String;
  userNameBn: String;
  password: String;
  createdBy: String;
  status: string;

  instituteShiftList: EducationShiftEntity[];
  instituteVersionList: EducationVersionEntity[];
  instituteTypeList: EducationTypeEntity[];
  instituteSessionList: EducationSessionEntity[];

  //principal and accountant information
  principalNameEn: String;
  principalNameBn: String;
  principalUserName: String;
  principalPassword: String;
  principalEmail: String;
  principalPhoneNumber: String;

  accountantNameEn: String;
  accountantNameBn: String;
  accountantUserName: String;
  accountantPassword: String;
  accountantEmail: String;
  accountantPhoneNumber: String;


}
