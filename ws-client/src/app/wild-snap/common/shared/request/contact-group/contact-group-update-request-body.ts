import { ContactGroupDetails } from "../../model/contact-group/contact-group-details";

export class ContactGroupUpdateRequestBody {
  oid: string;
  nameEn: string;
  nameBn: string;
  remarks: string;
  status: string;
  instituteOid: string;
  contactGroupDetailsList: ContactGroupDetails[] = [];
}
