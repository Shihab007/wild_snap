

import { RequestHeader } from "../../header/request-header";
import { ResponseHeader } from "../../header/response-header";
import { AddExamResponseBody } from "./add-exam-response-body";

export class AddExamResponse{
    header: ResponseHeader;
    body: AddExamResponseBody;
}