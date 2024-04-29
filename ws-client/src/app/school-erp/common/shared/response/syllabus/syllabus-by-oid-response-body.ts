import { SyllabusDetails, SyllabusMarkDistribution } from "../../model/syllabus/syllabus";

export class SyllabusByOidResponseBody {
  oid: string;
  instituteVersionOid: string;
  instituteVersionNameEn: string;
  instituteVersionNameBn: string;
  instituteSessionOid: string;
  instituteSessionNameEn: string;
  instituteSessionNameBn: string;
  instituteClassOid: string;
  instituteClassNameEn: string;
  instituteClassNameBn: string;
  instituteClassGroupOid: string;
  instituteClassGroupNameEn: string;
  instituteClassGroupNameBn: string;
  instituteClassSubjectOid: string;
  instituteSubjectNameEn: string;
  instituteSubjectNameBn: string;
  status: string;
  subjectCode: string;

  syllabusDetailsList: SyllabusDetails[] = [];
  syllabusMarkDistributionList: SyllabusMarkDistribution[] = [];
}
