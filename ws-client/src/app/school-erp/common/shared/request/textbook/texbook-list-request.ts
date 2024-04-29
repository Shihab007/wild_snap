import { RequestHeader } from "../../header/request-header";
import { TextbookListRequestBody } from "./texbook-list-request-body";

export class TextbookListRequest {
    header: RequestHeader;
    body: TextbookListRequestBody;
}
