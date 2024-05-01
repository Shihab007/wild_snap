import { Homework } from "../../model/homework/homework";
export class HomeworkRequestBody {

  oid: string;
  instituteOid: string;
  classOid: string;
  sectionOid: string;
  teacherOid: string;
  homework: Homework = new Homework();

}
