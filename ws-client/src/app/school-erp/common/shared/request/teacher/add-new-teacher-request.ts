import { Header } from "src/app/common/request/base-request";
import { AddNewTeacherRequestBody } from "./add-new-teacher-request-body";
import { AddNewTeacherRequestHeader } from "./add-new-teacher-request-header";

export class AddNewTeacherRequest {

  header: Header = new Header();
  body: AddNewTeacherRequestBody;

}