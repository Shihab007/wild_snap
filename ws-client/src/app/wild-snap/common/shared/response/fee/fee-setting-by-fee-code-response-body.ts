export class FeeSettingByFeeCodeResponseBody {
  oid: string;
  nameEn: string;
  nameBn: string;
  amount: number;
  startDate: Date;
  endDate: Date;
  paymentLastDate: Date;
  noOfCollection: number;
  paymentMode: string;
  scheduleStatus: string;
  scheduleTime: string;
  remarks: string;
  status: string;
  feeHeadGroupOid: string;
  feeHeadGroupCode: string;
  sessionOid: string;
  instituteClassOid: string;
  feeHeadGroupNameEn: string;
  feeHeadGroupNameBn: string;
  instituteSessionNameEn: string;
  instituteSessionNameBn: string;
  instituteClassNameEn: string;
  instituteClassNameBn: string;
  feeSettingDetailsList: FeeSettingDetailsModel[] = [];
}

export class FeeSettingDetailsModel {
  oid: string;
  amount: number;
  feeHeadOid: string;
  status: string;
  feeSettingOid: string;
  instituteOid: string;
  feeHeadNameEn: string;
  feeHeadNameBn: string;
}
