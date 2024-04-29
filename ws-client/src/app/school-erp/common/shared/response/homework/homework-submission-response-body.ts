import { HomeworkSubmissionDetails } from "../../model/homework/homework-submission-details";
export class HomeworkSubmissionResponseBody {
  homeworkOid: string;
  submissionDate: string;
  createdBy: string;
  homeworkSubmissionList: HomeworkSubmissionDetails[];
}
