export class SaveLedgerRequestBody {
  oid: string;
  nameEn: string;
  nameBn: string;
  ledgerCode: string;
  mnemonic: string;
  ledgerType: string;
  isBalanceSheetItem: string;
  ledgerBalance: number;
  openingBalance: number;
  closingBalance: number;
  ledgerSubGroupCode: string;
  versionId: string;
  status: string;
  ledgerSubGroupOid: string;
  instituteOid: string;
  ledgerSubGroupNameEn: string;
  ledgerSubGroupNameBn: string;
}
