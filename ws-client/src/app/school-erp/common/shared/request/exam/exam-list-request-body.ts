import { RequestHeader } from "../../header/request-header";

export class ExamListRequestBody {
  instituteOid: string;
  instituteSessionOid: string;
  searchText: string;
  status: string;
}
