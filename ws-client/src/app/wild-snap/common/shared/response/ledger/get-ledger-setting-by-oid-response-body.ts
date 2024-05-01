
import { LedgerSettingList } from "../../model/ledger/ledger-setting-list";

export class GetLedgerSettingByOidResponseBody {

  oid: string;
  nameEn: string;
  nameBn: string;
  ledgerNameEn: string;
  ledgerNameBn: string;
  ledgerCode: string;

  ledgerOid: string;
  status: string;
  instituteOid: string;
  createdBy: string;
  updatedBy: string;
}
