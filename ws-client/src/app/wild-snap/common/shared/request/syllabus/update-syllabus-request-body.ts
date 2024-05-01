import { SyllabusDetails, SyllabusMarkDistribution } from "../../model/syllabus/syllabus";

export class UpdateSyllabusRequestBody {
  oid: string;
  instituteOid: string;
  instituteVersionOid: string;
  instituteSessionOid: string;
  instituteClassOid: string;
  instituteClassGroupOid: string;
  instituteClassSubjectOid: string;
  status: string;
  educationSubjectNameBn: string;
  educationSubjectNameEn: string;
  subjectCode: string;

  syllabusDetailsList: SyllabusDetails[] = [];
  syllabusMarkDistributionList: SyllabusMarkDistribution[] = [];
}
