export class Syllabus {
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
  instituteSubjectOid: string;
  instituteSubjectNameEn: string;
  instituteSubjectNameBn: string;
  status: string;

  syllabusDetails: SyllabusDetails[] = [];
  syllabusMarkDistribution: SyllabusMarkDistribution[] = [];

}

export class SyllabusDetails {
  oid: string;
  syllabusOid: string;
  termOid: string;
  termNameEn: string;
  termNameBn: string;
  topicNameEn: string;
  topicNameBn: string;
  topicDetailsEn: string;
  topicDetailsBn: string;
  status: string;
}


export class SyllabusDetailsNew {
  detail: Detail[] = []
}
export class Detail {
  oid: string;
  syllabusOid: string;
  termOid: string;
  termNameEn: string;
  termNameBn: string;
  topicNameEn: string;
  topicNameBn: string;
  topicDetailsEn: string;
  topicDetailsBn: string;
  status: string;
}

export class SyllabusMarkDistribution {
  oid: string;
  syllabusOid: string;
  questionTypeEn: string;
  questionTypeBn: string;
  comment: string;
  quantity: number;
  mark: number;
  totalMarks: number;
  status: string;
}



export class SyllabusTerm {

  termOid: string;
  termNameEn: string;
  termNameBn: string;
  syllabusDetails: SyllabusDetails[] = [];
}