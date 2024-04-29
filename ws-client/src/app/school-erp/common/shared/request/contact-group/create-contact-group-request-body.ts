import { ContactGroupDetails } from "../../model/contact-group/contact-group-details";

export class CreateContactGroupRequestBody {
  oid: string;
  nameEn: string;
  nameBn: string;
  remarks: string;
  instituteOid: string;
  status: string;
  contactGroupDetailsList: ContactGroupDetails[] = [];
}
