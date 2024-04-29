import { EducationTextbookVersion } from "../../model/textbook/education-textbook-version";

export class EducationTextbookListBySessionResponseBody {

  mediumNameEn: string;
  mediumNameBn: string;
  sessionNameEn: string;
  sessionNameBn: string;
  curriculumNameEn: string;
  curriculumNameBn: string;

  educationVersionList: EducationTextbookVersion[];
}
