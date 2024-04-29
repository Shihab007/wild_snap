import { StudentPromotionDetail } from "../../model/student-promotion/student-promotion-detail";

export class StudentPromotionViewResponseBody {

  oid: string;
  studentPromotionId: string;
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
  preparedBy: string;
  createdBy: string;
  updatedBy: string;
  status: string;

  studentPromotionDetailList: StudentPromotionDetail[] = [];




}
