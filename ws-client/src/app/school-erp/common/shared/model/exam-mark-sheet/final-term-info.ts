import { FinalSubjectMark } from "./final-subject-mark";

export class FinalTermInfo {

  termOid: string;
  termNameEn: string;
  termNameBn: string;
  finalResultPercentage: number;
  subjectMarkList: FinalSubjectMark[] = [];

}
