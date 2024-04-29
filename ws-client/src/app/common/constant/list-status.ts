import { DropdownData } from "./dropdown-data";
import { DropdownOption } from "./dropdown-option";

// export const listStatuses: DropdownOption[] = [
//   { display: 'Submitted', value: 'Submitted' },
//   { display: 'Draft', value: 'Draft' },
//   { display: 'Validated', value: 'Validated' },
//   { display: 'Payment Pending', value: 'Payment Pending' },
//   { display: 'Approved', value: 'Approved' },
//   { display: 'Approved Payment', value: 'Approved Payment' },
//   { display: 'On Shipped', value: 'On Shipped' },
//   { display: 'Received By BDEx', value: 'Received By BDEx' },
//   { display: 'Way To Delivery', value: 'Way To Delivery' },
//   { display: 'Shipment Completed', value: 'Shipment Completed' }
// ];

// export const shipmentList: DropdownOption[] = [
//   { display: 'Requisition Wise Shipment', value: 'Requisition Wise' },
//   { display: 'Admin to BDEx Shipment', value: 'Admin To BDEx' },
//   { display: 'Admin to Agent Shipment', value: 'Admin To Agent' }
// ];


export const studentFilterParameterList: DropdownData[] = [
  { value: 'Student ID', nameEn: 'Student ID', nameBn: 'শিক্ষার্থী আইডি' },
  { value: 'Blood Group', nameEn: 'Blood Group', nameBn: 'রক্তের গ্রুপ' },
  { value: 'District', nameEn: 'District', nameBn: 'জেলা' },
  { value: 'Session', nameEn: 'Session', nameBn: 'সেশন' },
];


export const activeStatusList: DropdownData[] = [
  { value: 'Active', nameEn: 'Active', nameBn: 'সক্রিয়' },
  { value: 'Inactive', nameEn: 'Inactive', nameBn: 'নিষ্ক্রিয়' }
];

export const assetTypeList: DropdownData[] = [
  { value: 'Self Use', nameEn: 'Self Use', nameBn: 'স্ব-ব্যবহার' },
  { value: 'Use for Reveniew', nameEn: 'Use for Reveniew', nameBn: 'আয়ের জন্য ব্যবহার' },
  { value: 'Other Use', nameEn: 'Other Use', nameBn: 'অন্যান্য ব্যবহার' }
];

export const periodTypeList: DropdownData[] = [
  { value: 'Monthly', nameEn: 'Monthly', nameBn: 'মাসিক' },
  { value: 'Yearly', nameEn: 'Yearly', nameBn: 'বার্ষিক' }
];


export const financialPeriodStatusList: DropdownData[] = [
  { value: 'Opened', nameEn: 'Opened', nameBn: 'চলমান' },
  { value: 'Closed', nameEn: 'Closed', nameBn: 'বন্ধ' }
];


export const financialPeriodTypeList: DropdownData[] = [
  { value: 'Monthly', nameEn: 'Monthly', nameBn: 'মাসিক' },
  { value: 'Quarterly', nameEn: 'Quaterly', nameBn: 'ত্রৈমাসিক' },
  { value: 'Half Yearly', nameEn: 'Half Yearly', nameBn: 'অর্ধবার্ষিক' },
  { value: 'Yearly', nameEn: 'Yearly', nameBn: 'বার্ষিক' }
];

export const ledgerSubGroupTypeList: DropdownData[] = [
  { value: 'Debit', nameEn: 'Debit', nameBn: 'ডেবিট' },
  { value: 'Credit', nameEn: 'Credit', nameBn: 'ক্রেডিট' }
];

export const assetNatureList: DropdownData[] = [
  { value: 'Rent', nameEn: 'Rent', nameBn: 'ভাড়া' },
  { value: 'Institute', nameEn: 'Institute', nameBn: 'প্রতিষ্ঠান' },
  { value: 'Both', nameEn: 'Both', nameBn: 'উভয়' }
];

export const paymentModeList: DropdownData[] = [
  { value: 'Monthly', nameEn: 'Monthly', nameBn: 'মাসিক' },
  { value: 'Yearly', nameEn: 'Yearly', nameBn: 'বার্ষিক' }
];

export const paymentGateway: DropdownData[] = [
  { value: 'Cash', nameEn: 'Cash', nameBn: 'ক্যাশ' },
  { value: 'bkash', nameEn: 'bKash', nameBn: 'বিকাশ' }
];


export const onOffList: DropdownData[] = [
  { value: 'On', nameEn: 'On', nameBn: 'চালু' },
  { value: 'Off', nameEn: 'Off', nameBn: 'বন্ধ' }
];

export const languageList: DropdownData[] = [
  { value: 'Bangla', nameEn: 'Bangla', nameBn: 'বাংলা' },
  { value: 'English', nameEn: 'English', nameBn: 'ইংরেজি' }
];

export const smsLogListStatus: DropdownData[] = [
  { value: '', nameEn: 'All Status', nameBn: 'সকল অবস্থা' },
  { value: 'Pending', nameEn: 'Pending', nameBn: 'অপেক্ষমান' },
  { value: 'Approved', nameEn: 'Approved', nameBn: 'অনুমোদিত' },
  { value: 'Rejected', nameEn: 'Rejected', nameBn: 'প্রত্যাখ্যাত' },
  { value: 'Cancelled', nameEn: 'Cancelled', nameBn: 'বাতিল' },
];


export const peopleTypeList: DropdownData[] = [
  { value: 'Asset Holder', nameEn: 'Asset Holder', nameBn: 'সম্পদ ধারক' },
];

export const religionList: DropdownData[] = [
  { value: 'Islam', nameEn: 'Islam', nameBn: 'ইসলাম' },
  { value: 'Hindu', nameEn: 'Hindu', nameBn: 'হিন্দু' },
  { value: 'Buddha', nameEn: 'Buddha', nameBn: 'বুদ্ধ' },
  { value: 'Christian', nameEn: 'Christian', nameBn: 'খ্রিস্টান' },
];

export const bloodGroupList: DropdownData[] = [
  { value: 'A+', nameEn: 'A+', nameBn: 'এ+' },
  { value: 'B+', nameEn: 'B+', nameBn: 'বি+' },
  { value: 'O+', nameEn: 'O+', nameBn: 'ও+' },
  { value: 'AB+', nameEn: 'AB+', nameBn: 'এবি+' },
  { value: 'A-', nameEn: 'A-', nameBn: 'এ-' },
  { value: 'B-', nameEn: 'B-', nameBn: 'বি-' },
  { value: 'O-', nameEn: 'O-', nameBn: 'ও-' },
  { value: 'AB-', nameEn: 'AB-', nameBn: 'এবি-' },
];


export const subjectTypeSelectionList: DropdownData[] = [
  { value: 'Compulsory', nameEn: 'Compulsory', nameBn: 'বাধ্যতামূলক' },
  { value: 'Optional', nameEn: 'Optional', nameBn: 'ঐচ্ছিক' },
  { value: 'Fourth', nameEn: 'Fourth', nameBn: 'চতুর্থ' }
];
export const promotionStatus: DropdownData[] = [
  { value: 'Promoted', nameEn: 'Promoted', nameBn: 'উত্তীর্ণ' },
  { value: 'Failed', nameEn: 'Failed', nameBn: 'অনুত্তীর্ণ' }
];

export const scheduleMode: DropdownData[] = [
  { value: 'Once', nameEn: 'Once', nameBn: 'একবার' },
  { value: 'Daily', nameEn: 'Daily', nameBn: 'দৈনিক' },
  { value: 'Weekly', nameEn: 'Weekly', nameBn: 'সাপ্তাহিক' },
  { value: 'Monthly', nameEn: 'Monthly', nameBn: 'মাসিক' },
  { value: 'Yearly', nameEn: 'Yearly', nameBn: 'বার্ষিক' }
];


export const bankList: DropdownData[] = [
  { value: 'SCHOOL-ERP-Bank-0001', nameEn: 'Agrani Bank Limited', nameBn: 'অগ্রণী ব্যাংক লিমিটেড' },
  { value: 'SCHOOL-ERP-Bank-0002', nameEn: 'Bangladesh Development Bank', nameBn: 'বাংলাদেশ উন্নয়ন ব্যাংক' }
];

export const transactionNatureList: DropdownData[] = [
  { value: 'WITHDRAW', nameEn: 'WITHDRAW', nameBn: 'উত্তোলন' },
  { value: 'BANK TO CASH', nameEn: 'BANK TO CASH', nameBn: 'ব্যাংক থেকে নগদ' },
  { value: 'CASH TO BANK', nameEn: 'CASH TO BANK', nameBn: 'ব্যাংকে নগদ' },
  { value: 'DEPOSIT', nameEn: 'DEPOSIT', nameBn: 'ডিপোজিট' },
  { value: 'BANK TO BANK', nameEn: 'BANK TO BANK', nameBn: 'ব্যাংক থেকে ব্যাংক' }
];

export const transactionReferenceTypeList: DropdownData[] = [
  { value: 'SCHOOL-ERP-ref-0001', nameEn: 'TEACHER', nameBn: 'শিক্ষক' },
  { value: 'SCHOOL-ERP-ref-0002', nameEn: 'STAFF', nameBn: 'কর্মী' }
];
[, , ,]
export const feeHeadGroupTypeList: DropdownData[] = [
  { value: 'One Time', nameEn: 'One Time', nameBn: 'একবার' },
  { value: 'Multiple', nameEn: 'Multiple', nameBn: 'একাধিক' },
  { value: 'Repeat', nameEn: 'Repeat', nameBn: 'পুনরাবৃত্তি' },
  { value: 'Custom', nameEn: 'Custom', nameBn: 'কাস্টম' },
];
[,]
export const feeHeadGroupNatureList: DropdownData[] = [
  { value: 'System', nameEn: 'System', nameBn: 'সিস্টেম' },
  { value: 'Custom', nameEn: 'Custom', nameBn: 'কাস্টম' }
];


export const paymentStatusList: DropdownData[] = [
  { value: 'Paid', nameEn: 'Paid', nameBn: 'পরিশোধিত' },
  { value: 'Due', nameEn: 'Due', nameBn: 'বকেয়া' },
  { value: 'All', nameEn: 'All', nameBn: 'সব' }
];

export const paymentTypeList: DropdownData[] = [
  { value: 'Cash', nameEn: 'Cash', nameBn: 'নগদ' },
  { value: 'MFS', nameEn: 'MFS', nameBn: 'এমএফএস' },
  { value: 'Bank', nameEn: 'Bank', nameBn: 'ব্যাংক' }
];



export const feeSettingPaymentModeList: DropdownData[] = [
  { value: 'One Time', nameEn: 'One Time', nameBn: 'একবার' },
  { value: 'Monthly', nameEn: 'Monthly', nameBn: 'মাসিক' },
  { value: 'Daily', nameEn: 'Daily', nameBn: 'দৈনিক' },
  { value: 'Custom', nameEn: 'Custom', nameBn: 'কাস্টম' }
];

export const feeSettingScheduleStatusLis: DropdownData[] = [
  { value: 'Yes', nameEn: 'Yes', nameBn: 'হ্যা' },
  { value: 'No', nameEn: 'No', nameBn: 'না' }
];
