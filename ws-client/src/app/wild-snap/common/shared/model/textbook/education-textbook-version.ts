import { EducationTextbook } from "./education-textbook";

export class EducationTextbookVersion {

  oid: string;
  nameEn: string;
  nameBn: string;
  status: string;

  educationTextbookList: EducationTextbook[];
}
