export class InstituteClassTerm {
  oid: string;
  termId: string;
  instituteClassSettingOid: string;
  nameEn: string;
  nameBn: string;
  startDate: Date;
  endDate: Date;
  sba: number;
  finalResultPercentage: number = 0;
  sortOrder: number;
  status: string;
  createdBy: string;
  updatedBy: string;
  check: boolean;
}