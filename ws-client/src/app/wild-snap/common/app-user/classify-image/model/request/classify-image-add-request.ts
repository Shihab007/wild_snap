import { RequestHeader } from "src/app/wild-snap/common/shared/header/request-header";
import { ClassifyImageAddRequestBody } from "./classify-image-add-request-body";

export class ClassifyImageAddRequest {
    header:RequestHeader;
    body:ClassifyImageAddRequestBody;
}
