import { ResponseHeader } from "../../header/response-header";
import { CreateFeeSettingReponseBody } from "./create-fee-setting-reponse-body";

export class CreateFeeSettingReponse {
  header: ResponseHeader;
  body: CreateFeeSettingReponseBody;
}
