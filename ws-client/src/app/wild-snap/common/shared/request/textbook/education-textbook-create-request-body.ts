import { EducationTextbook } from "../../model/textbook/education-textbook";

export class EducationTextbookCreateRequestBody {

  educationVersionOid: string;
  educationSessionOid: string;
  educationClassOid: string;
  status: string;
  createdBy: string;
  updatedBy: string;

  updateTextbookList: EducationTextbook[];
  saveTextbookList: EducationTextbook[];
  deleteTextbookList: EducationTextbook[];

}
