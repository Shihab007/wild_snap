import { AddressBangla } from "../../model/address/address-bangla";
import { AddressEnglish } from "../../model/address/address-english";

export class GetSmsServiceLogByOidResponseBody {
  oid: string;
  smsServiceOid: string;
  presentSmsServiceStatus: string;
  requestSmsServiceStatus: string;
  requestedBy: string;
  requestedOn: string;
  approvedBy: string;
  approvedOn: string;
  remarks: string;
  status: string;
  serviceType: string;
  instituteOid: string;
  createdBy: string;
  requestedBynameBn: string;
  requestedBymobileNo: string;
  requestedByemail: string;
  requestedByphotoPath: string;
  requestedByphotoUrl: string;
  instituteNameEn: string;
  instituteNameBn: string;
  smsServiceNameEn: string;
  smsServiceNameBn: string;
  smsLanguage: string;

  addressJsonEn: string;
  addressJsonBn: string;


  addressEn: AddressEnglish = new AddressEnglish();
  addressBn: AddressBangla = new AddressBangla();
}
