import { ContactGroupDetails } from "../../model/contact-group/contact-group-details";

export class SmsContactNotificationRequestBody {
  instituteOid: string;
  loginId: string;
  username: string;

  smsText: string;
  contactList: ContactGroupDetails[] = [];
}
