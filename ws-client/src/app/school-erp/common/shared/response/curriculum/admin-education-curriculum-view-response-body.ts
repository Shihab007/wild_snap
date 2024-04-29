export class AdminEducationCurriculumViewResponseBody {
  oid: string;
  nameEn: string;
  nameBn: string;
  shortName: string;
  website: string;
  status: string;
  educationMediumOid: string;
  educationMediumNameEn: string;
  educationMediumNameBn: string;
  countryOid: string;
  countryNameEn: string;
  countryNameBn: string;

  educationSystems: EducationSystem[] = [];

}

export class EducationSystem {
  oid: string;
  nameEn: string;
  nameBn: string;
  shortName: string;
  status: string;
  educationCurriculumOid: string;
  numberOfInstitute: number;
}
