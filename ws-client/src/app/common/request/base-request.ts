import { v4 as uuid } from 'uuid';
import { APPLICATION_NAME, APPLICATION_SERVICE_NAME, CLIENT_NAME, REQUEST_TIMEOUT_IN_SECONDS, REQUEST_VERSION } from '../constant/constant';
import * as moment from 'moment-timezone';
import { RequestHeader } from 'src/app/school-erp/common/shared/header/request-header';

export class Header {
  requestId: string = uuid();
  requestClient: string = CLIENT_NAME;
  requestType: string;
  requestSource: string = APPLICATION_NAME;
  requestServiceSource: string = APPLICATION_SERVICE_NAME;
  requestVersion: string = REQUEST_VERSION;
  requestTime = moment().tz('Asia/Dhaka').format('YYYY-MM-DDTHH:mm:ss.SSSSSS') + 'Z';
  requestDateTime = moment().tz('Asia/Dhaka').format('YYYY-MM-DDTHH:mm:ss.SSSSSS') + 'Z';
  requestTimeoutInSeconds: number = REQUEST_TIMEOUT_IN_SECONDS;
  requestRetryCount = 0;
}

export abstract class BaseRequest {
  header: Header = new Header();
  meta: object = new Object();
}
