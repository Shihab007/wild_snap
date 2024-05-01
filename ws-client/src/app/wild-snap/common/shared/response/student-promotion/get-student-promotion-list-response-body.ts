import { StudentPromotionInfo } from "../../model/student-promotion/student-promotion-info";

export class GetStudentPromotionListResponseBody {
  studentPromotionList: StudentPromotionList[] = [];
}


export class StudentPromotionList {

  oid: string;
  studentpromotionId: string;
  preparedBy: string;


  //institute
  instituteOid: string;
  instituteNameEn: string;
  instituteNameBn: string;

  instituteSessionOid: string;
  instituteSessionNameEn: string;
  instituteSessionNameBn: string;

  instituteClassOid: string;
  instituteClassNameEn: string;
  instituteClassNameBn: string;

  instituteClassGroupOid: string;
  instituteClassGroupNameEn: string;
  instituteClassGroupNameBn: string;

  instituteShiftOid: string;
  instituteShiftNameEn: string;
  instituteShiftNameBn: string;

  instituteVersionOid: string;
  instituteVersionNameEn: string;
  instituteVersionNameBn: string;

  createdBy: string;
  updatedBy: string;
  status: string;



}