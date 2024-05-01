import { RequestHeader } from "../../header/request-header";
import { AddExamRequestBody } from "./add-exam-request-body";

export class AddExamRequest{
    header: RequestHeader;
    body: AddExamRequestBody;
}