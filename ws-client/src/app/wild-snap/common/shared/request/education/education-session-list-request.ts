import { RequestHeader } from "../../header/request-header";
import { EducationSessionListRequestBody} from "./education-session-list-request-body";

export class EducationSessionListRequest {
    header: RequestHeader;
    body: EducationSessionListRequestBody;
}