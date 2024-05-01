import { HomeworkSubmissionDetails } from "../../model/homework/homework-submission-details";
export class HomeworkSubmissionRequestBody {
  homeworkOid: string;
  submissionDate: string;
  createdBy: string;
  homeworkSubmissionList: HomeworkSubmissionDetails[];
}
