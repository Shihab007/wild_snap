import { AdmissionFeesList } from "./admission-fees-list";

export class CheckAdmissionFeesSettingResponseBody {


  instituteNameEn: string;
  instituteNameBn: string;
  instituteAddressEn: string;
  instituteAddressBn: string;
  instituteEmail: string;
  instituteContact: string;
  eiinNumber: string;
  classNameEn: string;
  classNameBn: string;
  versionNameEn: string;
  versionNameBn: string;
  shiftNameEn: string;
  shiftNameBn: string;
  sessionNameEn: string;
  sessionNameBn: string;
  isAdmissionFeesSettings: boolean;
  totalAdmisionFeeAmount: number;
  feesSettingsList: AdmissionFeesList[] = [];
}
