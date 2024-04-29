import { FeeSettingDetailsEntity } from "./fee-setting-details-entity";

export class FeeSettingEntity {
  oid: string;
  nameEn: string;
  nameBn: string;
  amount: number;
  startDate: string;
  endDate: string;
  paymentLastDate: string;
  noOfCollection: number;
  paymentMode: string;
  scheduleStatus: string;
  scheduleTime: Date;
  remarks: string;
  status: string;
  feeHeadGroupOid: string;
  feeHeadGroupCode: string;
  sessionOid: string;
  instituteClassOid: string;
  instituteOid: string;
  createdBy: string;
  updatedBy: string;

  feeSettingDetails: FeeSettingDetailsEntity[];
}
