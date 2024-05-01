import { HomeworkSubmissionDetails } from "./homework-submission-details";

export class HomeworkSubmission {
  homeworkOid: string;
  submissionDate: string;
  createdBy: string;
  homeworkSubmissionList: HomeworkSubmissionDetails[];
}