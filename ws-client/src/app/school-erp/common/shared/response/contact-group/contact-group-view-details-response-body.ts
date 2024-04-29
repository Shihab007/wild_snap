import { ContactGroupViewList } from "../../model/contact-group/contact-group-view-list";

export class ContactGroupViewDetailsResponseBody {

  oid: string;
  nameEn: string;
  nameBn: string;
  remarks: string;
  instituteNameEn: string;
  instituteNameBn: string;
  status: string;

  contactGroupDetailsList: ContactGroupViewList[] = [];

}
