import { HomeworkDetail } from "./homework-detail";
import { HomeworkSubmission } from "./homework-submission";

export class Homework {
  oid: string;
  nameEn: string;
  nameBn: string;
  descriptionEn: string;
  descriptionBn: string;
  assignDate: string;
  submissionDate: string;
  teacherOid: string;
  classTextbookOid: string;
  educationSubjectOid: string;
  instituteOid: string;
  instituteSessionOid: string;
  instituteVersionOid: string;
  instituteShiftOid: string;
  instituteClassOid: string;
  instituteClassSectionOid: string;
  status: string;
  createdBy: string;

  instituteEn: string;
  instituteBn: string;

  classEn: string;
  classBn: string;

  shiftEn: string;
  shiftBn: string;

  sessionEn: string;
  sessionBn: string;

  classSectionEn: string;
  classSectionBn: string;

  versionEn: string;
  versionBn: string;

  subjectEn: string;
  subjectBn: string;

  sectionEn: string;
  sectionBn: string;

  homeWorkSubmissioHistory: HomeworkDetail[];
  homeWorkSubmission: HomeworkSubmission[];

}
