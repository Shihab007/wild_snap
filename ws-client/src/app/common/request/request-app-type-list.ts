import { BaseRequest } from './base-request';
class Body {
    oid: string;
    applicationType: any[];
}


export class RequestAppTypeList extends BaseRequest {
    constructor(applicationType: string) {
        super();
        this.header.requestServiceSource = 'get-requisition-list';
        this.body.applicationType = [applicationType];
    }
    body: Body = new Body();
}