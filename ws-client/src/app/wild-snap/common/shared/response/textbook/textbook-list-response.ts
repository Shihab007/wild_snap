import { ResponseHeader } from "../../header/response-header";
import { TextbookListResponseBody } from "./textbook-list-response-body";

export class TextbookListResponse {
    header: ResponseHeader;
    body: TextbookListResponseBody;
}
