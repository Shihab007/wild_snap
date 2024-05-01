import { AddressBangla } from "../address/address-bangla";
import { AddressEnglish } from "../address/address-english";

export class SmsServiceLogList {
  oid: string;
  smsServiceOid: string;
  serviceType: string;
  presentSmsServiceStatus: string;
  requestSmsServiceStatus: string;
  requestedBy: string;
  requestedOn: string;
  approvedBy: string;
  approvedOn: string;
  remarks: string;
  status: string;
  instituteOid: string;
  createdBy: string;
  instituteNameEn: string;
  instituteNameBn: string;
  instituteAddress: string;
  logoUrl: string;

  requestedByNameEn: string;
  requestedByNameBn: string;
  requestedByMobileNo: string;
  requestedByEmail: string;
  requestedByPhotoPath: string;
  requestedByPhotoUrl: string;
  instituteAddressJsonEn: string;
  instituteAddressJsonBn: string;
  instituteEmail: string;
  instituteContact: string;


  addressEn: AddressEnglish = new AddressEnglish();
  addressBn: AddressBangla = new AddressBangla();



  presentStatus: boolean;
  requestedStatus: boolean;
  approved: boolean = false;
  rejected: boolean = false;
}
