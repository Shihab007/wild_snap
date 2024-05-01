import { SyllabusDetails, SyllabusMarkDistribution } from "../../model/syllabus/syllabus";
import { TermWiseSyllabus } from "./term-wise-syllabus";

export class SaveSyllabusRequestBody {
  oid: string;
  instituteOid: string;
  instituteVersionOid: string;
  instituteSessionOid: string;
  instituteClassOid: string;
  instituteClassGroupOid: string;
  instituteClassSubjectOid: string;

  educationSubjectNameBn: string;
  educationSubjectNameEn: string;
  subjectCode: string;
  status: string;

  syllabusDetailsList: SyllabusDetails[] = [];

  syllabusMarkDistributionList: SyllabusMarkDistribution[] = [];

}
