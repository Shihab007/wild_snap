import { ResponseHeader } from "../../header/response-header";
import { Homework } from "../../model/homework/homework";
import { HomeWorkListResponseBody } from "./home-work-list-response-body";

export class HomeWorkListResponse {
  header: ResponseHeader = new ResponseHeader();
  body: HomeWorkListResponseBody;
}
