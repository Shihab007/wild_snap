import { ResponseHeader } from "src/app/wild-snap/common/shared/header/response-header";
import { ClassifyImageAddResponseBody } from "./classify-image-add-response-body";

export class ClassifyImageAddResponse {
    header:ResponseHeader;
    body:ClassifyImageAddResponseBody;
}
