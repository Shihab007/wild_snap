// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  // Implement Keycloak Port 9090 will be active
  baseURL: 'http://localhost:7070',

  // New URL for Live Server
  // baseURL: 'https://doer-school.celloscope.net/doer-erp/api',
  // baseURL: 'https://doer-school-test.celloscope.net/doer-erp/api',
  // baseURL: 'https://doer-school-iat.celloscope.net/doer-erp/api',


  // Implement Keycloak Port 9090 will be active 
  uploadImageUrl: 'http://localhost:7070/download-image/files/',
  // New URL for Live Server
  // uploadImageUrl: 'https://doer-school.celloscope.net/doer-erp/api/v1/file/receipt/download/files/',
  // uploadImageUrl: 'https://doer-school-test.celloscope.net/doer-erp/api/v1/file/receipt/download/files/',
  // uploadImageUrl: 'https://doer-school-iat.celloscope.net/doer-erp/api/v1/file/receipt/download/files/',



  REQUESTED_INSTITUTE_INFO: '/v1/requested-institute-info',

  // CLASS_LIST: '/v1/class-list',

  GET_EDUCATION_CLASS_LIST: '/v1/get-education-class-list',

  CLASS_TEST_LIST: '/v1/class/test/list',

  PARTICULAR_CLASS_BY_TEACHER_USERNAME: '/v1/particular/class/byteacher/username',

  CREATE_ATTENDANCE: '/v1/create/attendance',

  CLASS_ROOM_LIST: '/v1/class/room/list',

  PARTICULAR_CLASS_ROOM_LIST: '/v1/particular/class/room',

  UPDATE_CLASS_ROOM: '/v1/update/class/room',

  INSTITUTE_CLASS_GROUP_LIST: '/v1/institute/class/group/list',

  INSTITUTE_CLASS_GROUP_LIST_BY_CLASS_SESSION: '/v1/institute-class-group-list-byclassoid',

  INSTITUTE_CLASS_SECTION_LIST: '/v1/institute-class-section-list',

  GET_CLASS_SECTION_DETAILS_BY_OID: "/v1/get-institute-class-section-by-oid",


  createTeacherProfile: '/v1/create/teacher',


  viewTeacherProfile: '/v1/view/teacher/profile',

  updateTeacherProfile: '/v1/update/teacher/profile',

  GET_TEACHER_LIST: '/v1/get-teacher-list',

  particularTeacherList: '/v1/particular/teacher/list',

  editTeacherList: '/v1/edit/teacher',

  moveUploadedImage: '/v1/uploaded/file/move',


  GET_STUDENT_TEXTBOOK_LIST: '/v1/student-text-book-list',
  STUDENT_LIST_BY_TEXTBOOK_OID: '/v1/student-list-by-textbook-oid',
  STUDENT_LIST_BY_SUBJECT_OID: '/v1/student-list-by-subject-oid',
  GET_CLASS_SUBJECT_LIST_BY_STUDENT: '/v1/get-class-subject-list-by-student',
  GET_TEACHER_BY_OID: '/v1/teacher/by/oid',

  GET_GUARDIAN_BY_OID: '/v1/guardian/by/oid',

  addGuardianProfileInfo: '/v1/create/guardian',

  SAVE_GUARDIAN: '/v1/create/guardian',

  GET_GUARDIAN_LIST: '/v1/get-guardian-list',

  GET_INSTITUTE_GUARDIAN_LIST: '/v1/get-institute-guardian-list',

  // wild - snap ===============================================================================================================================

  userLogin: '/wild-snap/login',

  USER_ROLE_LIST: '/wild-snap/user-list',

  GET_PROFILE_BY_LOGIN_ID: "/wild-snap/user-info",

  USER_CHANGE_PASSWORD_BY_OTP: '/wild-snap/change-password',

  RegistrationApplicationForm: '/wild-snap/create-user',


  // wild - snap =================================================================================================================

  changePassword: '/v1/user/change-password',


  resetPassword: '/v1/reset-password',

  createUserAccount: '/v1/user/create-user-account',


  createClass: '/v1/create-class',

  dashboardInfo: '/v1/dashboard/info',

  GET_ADMIN_DASHBOARD_INFO: "/v1/get-admin-dashboard-info",

  GET_INSTITUTE_DASHBOARD_ALL_INFO: "/v1/get-institute-dashboard-all-info",

  instituteDashboardInfo: '/v1/get-institute-dashboard-info',

  studentDashboardInfo: '/v1/get-student-dashboard-info',

  studentAppDashboardInfo: "/v1/get-student-app-dashboard-info",

  guardianDashboardInfo: '/v1/get-guardian-dashboard-info',

  instituteSmsDashboardInfo: '/v1/get-institute-sms-dashboard',

  GET_ADMIN_SMS_DASHBOARD: "/v1/get-admin-sms-dashboard",


  dashboardInfoBdex: '/v1/dashboard/info/bdex',

  dashboardInfoAgent: '/v1/dashboard/info/agent',

  addNewTeacher: '/v1/create/teacher',
  classifyImageAdd: '/classify-image-add',







  addNewRoutine: '/v1/create-class-routine',







  createSubject: '/v1/create/subject',

  allRoutineList: '/v1/routine/list',

  particularRoutineList: '/v1/particular/routine/list',










  allSectionByParicularClassSection: '/v1/institute-class-section-list',






  keycloakUserInfo: '/v1/keycloak/user/info',

  getAllItemName: '/v1/get/item/name/list',

  allProductList: '/v1/product/list',

  itemNameList: '/v1/get/item/name/list',

  getAllProductCategoryUrl: '/v1/get/all/product/category',

  productListByCategoryForBatchItem: '/v1/product/list/batch/item',

  productListByCategoryForIndividualItem: '/v1/product/list/individual/item',

  createProduct: '/v1/create/product',

  SAVE_EDUCATION_TEXTBOOK: '/v1/save-education-textbook',

  getTextbookList: '/v1/institute/class/textbook/list',

  GET_CLASS_TEXT_BOOK_LIST_BY_SESSION: '/v1/get-class-textbook-list-by-session',

  CHECK_EXISTING_EDUCATION_TEXTBOOK: "/v1/check/existing/education/textbook",

  getClassSubjectList: '/v1/get-class-subject-list',

  GET_SUBJECT_MARK_DISTRIBUTION: "/v1/get-subject-mark-distribution",

  UPDATE_SUBJECT_MARK_DISTRIBUTION: "/v1/update-subject-mark-distribution",


  // uploadImage: '/v1/file/receipt/upload',

  allRequisitionList: '/v1/requisition/list',

  allRequisitionListForAdmin: '/v1/requisition/list/admin',

  activerequisitionlist: '/v1/active/requisition/list',

  bdexRequisitionList: '/v1/bdex/requisition/list',

  advancebdexRequisitionList: '/v1/advance/requisition/list/bdex',

  curriculumList: '/v1/curriculum/list',

  shiftList: '/v1/shift/list',


  groupList: '/v1/group/list',

  uploadImage: '/upload-image',

  getAllSection: '/v1/section/list',

  getAllSubjectBySectionOid: '/v1/subject/section/oid',

  getClassTestBySCSToid: '/v1/class/test/scst/oid',

  getAllSubject: '/v1/subject/list',

  createClassRoom: '/v1/add/class/room',


  addExam: '/v1/create/exam',

  getExamByOid: '/v1/exam/by/oid',

  EXAM_TEXT_BOOK_BY_OID: '/v1/get-exam-textbook-by-oid',

  EXAM_SUBJECT_BY_OID: '/v1/get-exam-subject-by-oid',

  getSectionByOid: '/v1/get-institute-class-section-by-oid',

  getClassByOid: '/v1/get-class-by-oid',
  getClassListBySessionOid: '/v1/institute-class-list-by-session',

  editSection: '/v1/update-institute-class-section',

  UPDATE_STUDENT_CLASS_SECTION: "/v1/update-student-class-section",

  APPROVE_REJECT_SECTION: "/v1/approve-reject-section",

  editClass: '/v1/update-class',

  editExam: "/v1/edit-exam",

  createClassTest: '/v1/add/class/test',

  sectionListByClassOid: '/v1/particular/section',


  APPROVE_EXAM: "/v1/approve-exam",
  REJECT_EXAM: "/v1/reject-exam",
  PUBLISH_EXAM: "/v1/publish-exam",

  APPROVE_EXPENSE: "/v1/approve-expense",
  REJECT_EXPENSE: "/v1/reject-expense",

  routineList: '/v1/routine/single',

  attendanceListByMonth: '/v1/attendance/list/by/month',





  getSubjectBySectionOid: '/v1/subject/section/oid',

  createExam: '/v1/create/exam',

  examList: '/v1/exam/list',

  educationSystemList: '/v1/education/system/list',
  educationBoardList: '/v1/education-board-list',
  educationShiftList: '/v1/education/shift/list',
  educationSessionList: '/v1/education/session/list',
  educationSessionInstituteList: '/v1/education-session-institute-list',
  saveEducationSession: '/v1/save-education-session',
  configureEducationSession: '/v1/configure-education-session',
  editEducationSession: '/v1/edit-education-session',
  getEducationSessionByOid: '/v1/education-session-by-oid',
  educationShift: '/v1/education/shift/by/oid',
  educationGradingSystemList: '/v1/education-grading-system-list',
  saveEducationCurriculum: '/v1/save-education-curriculum',

  educationSystemByOid: '/v1/get-education-system-by-oid',
  saveEducationSystemByOid: '/v1/save-education-system',
  updateEducationSystem: '/v1/update-education-system',


  CREATE_INSTITUTE_GRADING_SYSTEM: "/v1/create-institute-grading-system",
  EDIT_INSTITUTE_GRADING_SYSTEM: "/v1/edit-institute-grading-system",
  GET_INSTITUTE_GRADING_SYSTEM_BY_OID: "/v1/get-institute-grading-system-by-oid",
  GET_INSTITUTE_GRADING_SYSTEM_LIST: "/v1/get-institute-grading-system-list",

  sms_contact_notification: '/v1/sms-contact-notification',

  saveNotice: '/v1/save-notice',

  getNoticeList: '/v1/get-notice-list',

  getNoticeView: '/v1/get-notice-by-oid',

  editNotice: '/v1/update-notice',

  APPROVE_NOTICE: "/v1/approve-notice",

  REJECT_NOTICE: "/v1/reject-notice",

  // Exam
  GET_EXAM_LIST: '/v1/get-exam-list',

  //GET_EXAM_LIST_BY_SECTION: '/v1/exam-routine-list',

  EXAM_ROUTINE_LIST: '/v1/exam-routine-list',

  Guardian_EXAM_ROUTINE_LIST: '/v1/get-guardian-exam-list',


  SAVE_EXAM_ROUTINE: '/v1/save-exam-routine',

  UPDATE_EXAM_ROUTINE: '/v1/update-exam-routine',

  SAVE_EXAM_RESULT: '/v1/save-exam-result',

  CREATE_EXAM_MARK_SHEET: '/v1/create-exam-mark-sheet',

  CREATE_FINAL_EXAM_MARK_SHEET: '/v1/create-final-exam-mark-sheet',

  GET_EXAM_RESULT_LIST: '/v1/get-exam-result-list',

  GET_EXAM_RESULT_LIST_BY_STUDENT: '/v1/get-exam-result-list-by-student',

  EXAM_RESULT_BY_STUDENT_ID: "/v1/exam-result-by-student-id",

  EXAM_MARKSHIT_BY_STUDENT_ID: "/v1/exam-markshit-by-student-id",

  STUDENT_LIST_REPORT_BY_PARAMS: "/v1/get-student-list-report-by-params",


  SAVE_EXPENSE: '/v1/save-expense',

  EXPENSE_LIST: '/v1/get-expense-list',

  GET_EXPENSE: '/v1/get-expense',

  UPDATE_EXPENSE: '/v1/update-expense',


  GET_EXAM_RESULT_BY_SECTION_OID: '/v1/get-exam-result-by-section-oid',

  GET_EXAM_RESULT_DETAIL_LIST: '/v1/get-exam-result-detail-list',

  GET_STUDENT_LIST_BY_EXAMTEXTBOOK: '/v1/get-student-list-by-examtextbook',

  GET_STUDENT_LIST_BY_EXAMSUBJECT: '/v1/get-student-list-by-examsubject',
  GET_STUDENT_LIST_BY_EXAMSUBJECT_TERM: '/v1/subject-result-by-term',

  PUBLISH_EXAM_RESULT: '/v1/publish-exam-result',


  // admission

  ADMISSION_APPLICATION_BY_OID: '/v1/admission-application-by-oid',
  admissionForm: '/v1/create/applicant',
  updateAdmissionApplicationForm: '/v1/update-admission-application',
  allAdmissionList: '/v1/admission-list',
  approveAdmission: '/v1/admission-approval',
  ADD_STUDENT: '/v1/add-student',
  ADMISSION_SELECTION: "/v1/admission-selection",
  // Institute Grading System

  getInstituteGradingSystemList: '/v1/get-institute-grading-system-list',


  // Asset

  SAVE_ASSET: '/v1/save-asset',
  SAVE_ASSET_DETAIL: '/v1/save-asset-detail',
  GET_ASSET_BY_OID: '/v1/get-asset-by-oid',
  UPDATE_ASSET: '/v1/update-asset',
  GET_ASSET_LIST: '/v1/get-asset-list',
  GET_ASSET_DETAIL_LIST: '/v1/get-asset-detail-list',
  GET_ASSET_DETAIL_BY_OID: '/v1/get-asset-detail-by-oid',
  UPDATE_ASSET_DETAIL: '/v1/update-asset-detail',
  GET_ASSET_ALLOCATION_LIST: '/v1/get-asset-allocation-list',
  SAVE_ASSET_ALLOCATION: '/v1/save-asset-allocation',
  UPDATE_ASSET_ALLOCATION: '/v1/update-asset-allocation',
  GET_ASSET_ALLOCATION_BY_OID: '/v1/get-asset-allocation-by-oid',
  GET_ASSET_INCOME_LIST: '/v1/get-asset-income-list',
  SAVE_ASSET_INCOME: '/v1/save-asset-income',
  SAVE_ASSET_DUE_INCOME_LIST: '/v1/get-asset-due-income-list',
  UPDATE_ASSET_INCOME: '/v1/update-asset-income',
  GET_ASSET_INCOME_BY_OID: '/v1/get-asset-income-by-oid',
  GET_ASSET_HOLDER_BY_ASSET_DETAILS_OID: '/v1/get-asset-holder-by-asset-details-oid',
  SAVE_ASSET_INCOME_COLLECTION: '/v1/save-income-collection',
  GET_ASSET_INCOME_COLLECTION_LIST: '/v1/get-income-collection-list',
  GET_INCOME_COLLECTION_LIST_BY_ALL_ASSET: '/v1/get-income-collection-list-by-all-asset',
  UPDATE_ASSET_INCOME_COLLECTION: '/v1/update-income-collection',
  GET_ASSET_INCOME_COLLECTION_BY_OID: '/v1/get-income-collection-by-oid',
  GET_INCOME_COLLECTION_BY_ASSET: '/v1/get-income-collection-by-asset',
  GET_INCOME_COLLECTION_BY_ASSET_HOLDER: '/v1/get-income-collection-by-asset-holder',
  GET_INCOME_COLLECTION_DETAIL_BY_ASSET_HOLDER: '/v1/get-income-collection-detail-by-asset-holder',
  GET_INCOME_COLLECTION_BY_ALL_ASSET: '/v1/get-income-collection-by-all-asset',


  //People

  GET_PEOPLE_LIST: '/v1/get-people-list',
  GET_PEOPLE_BY_OID: '/v1/get-people-by-oid',
  SAVE_PEOPLE: '/v1/save-people',
  UPDATE_PEOPLE: '/v1/update-people',
  APPROVE_PEOPLE: "/v1/approve-people",
  REJECT_PEOPLE: "/v1/reject-people",


  //Bank

  GET_BANK_ACCOUNT_LIST: '/v1/get-bank-account-list',
  GET_BANK_ACCOUNT_BY_OID: '/v1/get-bank-account-by-oid',
  SAVE_BANK_ACCOUNT: '/v1/save-bank-account',
  UPDATE_BANK_ACCOUNT: '/v1/update-bank-account',
  SAVE_BANK_TRANSACTION: "/v1/save-bank-transaction",
  GET_BANK_TRANSACTION_LIST: "/v1/get-bank-transaction-list",


  // routine

  weekDayList: '/v1/week/day/name/list',

  CLASS_PERIOD_EDIT: '/v1/class-period-edit',
  CREATE_CLASS_PERIOD: '/v1/create-class-period',
  GET_CLASS_PERIOD_LIST: '/v1/get-class-period-list',
  CLASS_PERIOD_EDIT_LIST: '/v1/class-period-edit-list',

  GET_ATTENDANCE_BY_STUDENT_OID: '/v1/get-attendance-by-student-oid',

  CHECK_ATTENDANCE: '/v1/check-student-attendance',


  GET_CLASS_ROUTINE_DETAILS_BY_OID: '/v1/get-class-routine-details-by-oid',

  GET_CLASS_ROUTINE_DETAILS_BY_TEACHER_OID: '/v1/get-class-routine-details-by-teacher-oid',
  GET_EXISTING_CLASS_ROUTINE_DETAILS_BY_OID: '/v1/get-existing-class-routine-details-by-oid',

  APPROVE_REJECT_CLASS_ROUTINE: "/v1/approve-reject-class-routine",

  GET_EXAM_ROUTINE_BY_OID: '/v1/get-exam-routine-by-oid',

  // classRoutineList: '/v1/class/priod/list',

  CLASS_ROUTINE_DETAILS_SAVE: '/v1/class-routine-details-save',

  GET_CLASS_ROUTINE_LIST: '/v1/get-class-routine-list',

  CLASS_ROUTINE_DETAILS_UPDATE: '/v1/class-routine-details-update',

  CHECK_CLASS_ROUTINE_BY_SECTION_OID: '/v1/check-class-routine-by-section-oid',

  // routine





  //teacherList
  teacherList: '/v1/teacher/by/oid',


  //textbook
  textbookList: '/v1/institute/class/textbook/list',

  GET_TEACHER_BY_GUARDIAN: '/v1/get-teacher-by-guardian-oid',

  GET_EDUCATION_INFO: '/v1/get-education-info',
  GET_COUNTRY_LIST: '/v1/country-list',


  GET_INSTITUTE_SUBJECT_LIST: '/v1/get-institute-subject-list',
  SUBJECT_LIST: '/v1/subject/list',
  //sectionList
  sectionList: '/v1/institute/class/section/list',
  EDUCATION_CURRICULUM_LIST: "/v1/education/curriculum/list",
  CREATE_EDUCATION_CURRICULUM: "/v1/save-education-curriculum",
  UPDATE_EDUCATION_CURRICULUM: "/v1/update-education-curriculum",
  GET_EDUCATION_MEDIUM: "/v1/education/medium/list",
  GET_EDUCATION_CURRICULUM: "/v1/get-education-curriculum-by-oid",

  //student attendance
  saveStudentAttendance: '/v1/save/student/attendance',
  UPDATE_STUDENT_ATTENDANCE: '/v1/update-student-attendance',
  getStudentAttendanceList: '/v1/student/attendance/list',
  GET_STUDENT_ATTENDANCE_BY_OID: '/v1/get-student-attendance-by-oid',
  studentAttendanceDetails: '/v1/student/attendance/details',

  //education subject 
  EDUCATION_SUBJECT_LIST: '/v1/get-education-subject-list',
  EDUCATION_SUBJECT_ADD: '/v1/save-education-subject',
  EDUCATION_SUBJECT_BY_OID: '/v1/get-education-subject-by-oid',
  EDUCATION_SUBJECT_EDIT: '/v1/update-education-subject',

  // New API End-Point Start form here
  GET_DIVISION_LIST: '/v1/get-division-list',
  GET_DISTRICT_LIST: '/v1/get-district-list',
  GET_THANA_LIST: '/v1/get-thana-list',

  //Institute
  createInstitute: "/v1/create-institute",
  getInstituteByOid: "/v1/get-institute-by-oid",
  editInstitute: "/v1/edit/institute",
  instituteByOid: "v1/institute-oid",
  INSTITUTE_CLASS_LIST: '/v1/institute-class-list',
  GET_INSTITUTE_INFO: '/v1/get-institute-info',
  GET_INSTITUTE_LIST: '/v1/get-institute-list',
  instituteTypeList: '/v1/institute-type-list',
  educationTypeList: '/v1/education-type-list',
  instituteVersionList: '/v1/institute-version-list',
  instituteSessionList: '/v1/institute-session-list',
  instituteShiftList: '/v1/institute-shift-list',
  getStaffComboList: "/v1/get-staff-list",
  CONFIGURE_MESSAGE_SCHEDULE_BY_INSTITUTE_OID: "/v1/configure-message-schedule-by-institute-oid",

  //sectionList

  //teacher attendance
  getTeacherAttendanceListByOid: '/v1/get-teacher-attendance-list-by-oid',
  getTeacherAttendance: '/v1/get-teacher-attendance',
  saveAndUpdateTeacherAttendance: '/v1/save-teacher-attendance',
  getTeacherAttendanceDetailsByOid: '/v1/get-teacher-attendance-details-by-oid',



  createClassSection: '/v1/create-section',
  //class Setting

  SAVE_INSTITUTE_CLASS_SETTING: "/v1/save-institute-class-setting",

  GET_INSTITUTE_CLASS_SETTING: "/v1/get-institute-class-setting",

  UPDATE_INSTITUTE_CLASS_SETTING: "/v1/update-institute-class-setting",

  //contact
  createContact: '/v1/save-contact',
  contactList: '/v1/get-contact-list',
  contactByOid: '/v1/get-contact-by-oid',
  editContact: '/v1/update-contact',
  contactListByStudent: '/v1/get-contact-list-by-student',
  contactListByGuardian: '/v1/get-contact-list-by-guardian',
  contactListByOthers: '/v1/get-contact-list-by-others',
  contactListByTeacher: '/v1/get-contact-list-by-teacher',

  //class test
  getClassTestList: "/v1/get-class-test-list",
  addClassTes: "/v1/save-class-test",
  getClassTestByOid: "/v1/get-class-test-details-by-oid",
  editClassTestByOid: "/v1/update-class-test",
  saveClassTestMark: "/v1/save-class-test-mark",
  updateClassRestMark: "/v1/update-class-test-mark",

  //
  contactGroupList: '/v1/get-contact-group-list',
  createContactGroup: '/v1/save-contact-group',
  contactGroupDetailsByOid: '/v1/get-contact-group-details-by-oid',
  updateContactGroup: '/v1/update-contact-group',

  // New API End-Point Start form here

  particularStudentList: '/v1/particular-student-list',
  UPDATE_STUDENT: '/v1/update-student',
  UPDATE_GUARDIAN: '/v1/update-guardian',
  CREATE_STUDENT_PROFILE: '/v1/create-student-profile',
  UPDATE_STUDENT_PROFILE: '/v1/update-student-profile-by-username',
  STUDENT_PROFILE: '/v1/student-profile',
  allStudentList: '/v1/student-list',


  //student promotion
  GET_STUDENT_PROMOTION_INFO: "/v1/get-student-promotion-info",
  GET_STUDENT_PROMOTION_LIST: "/v1/get-student-promotion-list",
  GET_STUDENT_PROMOTION_BY_OID: "/v1/get-student-promotion-by-oid",
  SAVE_STUDENT_PROMOTION: "/v1/save-student-promotion",
  //studentProfileInfoByOid: '/v1/get-student-by-oid',
  GET_STUDENT_BY_OID: '/v1/get-student-by-oid',
  guardianStudentList: '/v1/guardian/student/list',
  childList: '/v1/child-list',
  addNewStudent: '/v1/create/student',
  PARTICULAR_STUDENT_BY_SECTION_OID: '/v1/student-list-by-section-oid',




  UPDATE_TEACHER: '/v1/update-teacher',
  APPROVE_REJECT_TEACHER: "/v1/approve-reject-teacher",

  //OTP API STARTS

  COMMON_SEND_OTP_BY_MOBILE_API_V1: '/v1/send-otp-by-mobile',
  COMMON_RESEND_OTP_BY_MOBILE_API_V1: '/v1/resend-otp-by-mobile',
  COMMON_VERIFY_OTP_BY_MOBILE_API_V1: '/v1/verify-otp-by-mobile',

  COMMON_SEND_OTP_BY_LOGIN_ID_API_V1: '/v1/send-otp-by-loginid',
  COMMON_RESEND_OTP_BY_LOGIN_ID_API_V1: '/v1/resend-otp-by-loginid',
  COMMON_VERIFY_OTP_BY_LOGIN_ID_API_V1: '/v1/verify-otp-by-loginid',

  // Institute Shift CRUD API
  GET_INSTITUTE_SHIFT_LIST: '/v1/get-institute-shift-list',
  GET_INSTITUTE_SHIFT_BY_OID: '/v1/get-institute-shift-by-oid',
  CREATE_INSTITUTE_SHIFT: '/v1/create-institute-shift',
  UPDATE_INSTITUTE_SHIFT: '/v1/update-institute-shift',

  //Financial Period
  GET_FINANCIAL_PERIOD_LIST: '/v1/get-financial-period-list',
  GET_FINANCIAL_PERIOD_BY_OID: '/v1/get-financial-period-by-oid',
  SAVE_FINANCIAL_PERIOD: '/v1/save-financial-period',
  UPDATE_FINANCIAL_PERIOD: '/v1/update-financial-period',
  CLOSE_FINANCIAL_PERIOD_BY_OID: '/v1/close-financial-period-by-oid',

  //Ledger Group
  GET_LEDGER_GROUP_LIST: '/v1/get-ledger-group-list',
  GET_LEDGER_GROUP_BY_OID: '/v1/get-ledger-group-by-oid',
  SAVE_LEDGER_GROUP: '/v1/save-ledger-group',
  UPDATE_LEDGER_GROUP: '/v1/update-ledger-group',

  //Ledger sub group
  GET_LEDGER_SUB_GROUP_LIST: '/v1/get-ledger-sub-group-list',
  GET_LEDGER_SUB_GROUP_BY_OID: '/v1/get-ledger-sub-group-by-oid',
  SAVE_LEDGER_SUB_GROUP: '/v1/save-ledger-sub-group',
  UPDATE_LEDGER_SUB_GROUP: '/v1/update-ledger-sub-group',

  //Ledger
  GET_LEDGER_LIST: '/v1/get-ledger-list',
  GET_LEDGER_COMBO_LIST: '/v1/get-ledger-combo-list',
  GET_LEDGER_BY_OID: '/v1/get-ledger-by-oid',
  SAVE_LEDGER: '/v1/save-ledger',
  UPDATE_LEDGER: '/v1/update-ledger',

  //Sub Ledger
  GET_SUB_LEDGER_LIST: '/v1/get-sub-ledger-list',
  GET_SUB_LEDGER_COMBO_LIST: '/v1/get-sub-ledger-combo-list',
  GET_SUB_LEDGER_BY_OID: '/v1/get-sub-ledger-by-oid',

  //Ledger Setting
  GET_LEDGER_SETTING_LIST: '/v1/get-ledger-setting-list',
  GET_LEDGER_SETTING_BY_OID: '/v1/get-ledger-setting-by-oid',
  UPDATE_LEDGER_SETTING: '/v1/update-ledger-setting',
  //Institute Class List
  SAVE_INSTITUTE_CLASS_SUBJECT: "/v1/save-institute-class-subject",
  UPDATE_INSTITUTE_CLASS_SUBJECT: "/v1/update-institute-class-subject",
  GET_INSTITUTE_CLASS_SUBJECT_LIST: "/v1/get-institute-class-subject-list",
  GET_INSTITUTE_CLASS_SUBJECT_LIST_BY_CLASS_OID: "/v1/get-institute-class-subject-list-by-class-oid",
  GET_INSTITUTE_CLASS_SUBJECT_BY_CLASS_OID: "/v1/get-institute-class-subject-by-class-oid",
  GET_SUBJECT_LIST_BY_INSTITUTE_TYPE: "/v1/get-subject-list-by-insitute-type",
  UPDATE_STUDENT_SUBJECT: "/v1/update-student-subject",
  GET_SUBJECT_LIST_BY_STUDENT_ID: "/v1/get-subject-list-by-student-id",



  //EDUCATION CLASS
  GET_EDUCATION_CLASS_LIST_BY_SESSION: "/v1/get-education-class-list-by-session",


  //EDUCATION GROUP
  EDUCATION_GROUP_LIST_BY_SESSION: "/v1/get-education-group-list-by-session",

  //  Fees API Start form here
  CREATE_FEE_HEAD: '/v1/create-fee-head',
  UPDATE_FEE_HEAD: '/v1/update-fee-head',
  GET_FEE_HEAD_BY_OID: '/v1/get-fee-head-by-oid',
  CREATE_FEE_HEAD_GROUP_MAPPING: '/v1/create-fee-head-group-mapping',
  GET_FEE_HEAD_GROUP_MAPPING_LIST_BY_INSTITUTE: "/v1/get-fee-head-group-mapping-list-by-institute",
  GET_FEE_HEAD_GROUP_MAPPING_BY_INSTITUTE_AND_GROUP_CODE: "/v1/get-fee-head-group-mapping-by-institute-and-group-code",
  INSTITUTE_CLASS_WISE_GET_DUE_FEES: '/v1/get-due-fees-by-institute-class',
  INSTITUTE_CLASS_WISE_GET_DUE_FEES_HISTORY: '/v1/get-due-fees-history-by-institute-class',
  INSTITUTE_CLASS_WISE_GET_FEES_COLLECTION: '/v1/get-fees-collection-by-institute-class',
  INSTITUTE_CLASS_WISE_GET_FEES_COLLECTION_DETAIL: '/v1/get-fees-collection-detail-by-institute-class',

  GET_FEE_HEAD_GROUP_LIST: '/v1/get-fee-head-group-list',
  GET_FEE_HEAD_LIST: '/v1/get-fee-head-list',
  GET_INACTIVE_FEE_HEAD_LIST: '/v1/get-inactive-fee-head-list',
  INACTIVE_FEE_HEAD: '/v1/inactive-fee-head',
  ACTIVE_FEE_HEAD: '/v1/active-fee-head',
  GET_FEES_SETTING_DETAIL_BY_INSTITUTE_AND_CLASS_OID: '/v1/get-fees-setting-detail-by-institute-and-class-oid',
  CREATE_FEES_SETTINGS: '/v1/create-fees-setting',
  UPDATE_FEES_SETTINGS: '/v1/update-fees-setting',

  FEE_SETTING_BY_FEE_CODE: '/v1/get-fee-setting-by-fee-code',

  GET_DUE_FEES_DETAIL_BY_STUDENT: '/v1/get-due-fees-detail-by-student',
  GET_DUE_FEES_DETAIL_BY_APPLICATION_TRACKING_ID: '/v1/get-due-fees-detail-by-application-tracking-id',
  CREATE_FEES_COLLECTION_WITH_DETAIL: '/v1/create-fees-collection-with-detail',
  GET_FEES_COLLECTION_DETAIL_BY_STUDENT: '/v1/get-fees-collection-detail-by-student',
  GET_FEES_COLLECTION_LIST: '/v1/get-fees-collection-list',
  GET_PAYMENT_MODE_LIST: '/v1/get-payment-mode-list',
  CREATE_REPEATED_FEES: '/v1/create-repeated-fees',
  CHECK_ADMISSION_FEES_SETTINGS: '/v1/check-admission-fess-settings',


  //NEW FEE API END POINT

  //FEE HEAD GROUP
  GET_ALL_FEE_HEAD_GROUP_LIST: "/v1/get-all-fee-head-group-list",
  GET_FEE_HEAD_GROUP_BY_OID: "/v1/get-fee-head-group-by-oid",
  CREATE_FEE_HEAD_GROUP: "/v1/create-fee-head-group",
  UPDATE_FEE_HEAD_GROUP: "/v1/update-fee-head-group",


  //FEE SETTING

  CREATE_FEE_SETTING: "/v1/create-fee-setting",
  GET_FEE_SETTING_LIST: "/v1/get-fee-setting-list",
  GET_FEE_SETTING_BY_OID: "/v1/get-fee-setting-by-oid",
  UPDATE_FEE_SETTING: "/v1/update-fee-setting",
  GET_FEE_SETTING_BY_FEE_CODE: "/v1/get-fee-setting-by-fee-code",


  // Report part api end-point
  ATTENDANCE_REPORT_BY_SECTION: '/v1/get-attendance-report-by-section',
  ATTENDANCE_REPORT_BY_STUDENT_OID: '/v1/get-attendance-report-by-student-oid',



  GET_DUE_FEES_REPORT_BY_STUDENT_ID: '/v1/get-due-fees-detail-report-by-student-id',
  GET_DUE_FEES_REPORT_BY_INSTITUTE_CLASS: '/v1/get-due-fees-report-by-institute-class',
  GET_DUE_FEES_HISTORY_REPORT_BY_INSTITUTE_CLASS: '/v1/get-due-fees-history-report-by-institute-class',
  GET_FEES_COLLECTION_REPORT_BY_STUDENT_ID: '/v1/get-fees-collection-report-by-student-id',
  GET_FEES_COLLECTION_REPORT_BY_INSTITUTE_CLASS: '/v1/get-fees-collection-report-by-institute-class',
  GET_FEES_COLLECTION_DETAIL_REPORT_BY_INSTITUTE_CLASS: '/v1/get-fees-collection-detail-report-by-institute-class',

  GET_INCOME_COLLECTION_REPORT_BY_OID: '/v1/get-income-collection-report-by-oid',
  GET_INCOME_COLLECTION_REPORT_BY_ASSET: '/v1/get-income-collection-report-by-asset',
  GET_INCOME_COLLECTION_REPORT_BY_ALL_ASSET: '/v1/get-income-collection-report-by-allAsset',
  GET_INCOME_COLLECTION_REPORT_BY_ASSET_HOLDER: '/v1/get-income-collection-report-by-assetHolder',

  CREATE_HOMEWORK: '/v1/create-homework',
  UPDATE_HOMEWORK: '/v1/update-homework',
  GET_SUBJECT_LIST: '/v1/get-subject-list',
  GET_HOME_WORK_LIST: '/v1/get-home-work-list',
  GET_HOME_WORK_BY_OID: '/v1/get-home-work-details-by-oid',
  CREATE_HOMEWORK_SUBMISSION: '/v1/create-homework-submission',
  GET_HOME_WORK_LIST_BY_GUARDIAN_ID: '/v1/get-home-work-list-by-guardian-id',
  GET_HOME_WORK_LIST_BY_STUDENT_ID: '/v1/get-home-work-list-by-student-id',

  // Assignment
  GET_ASSIGNMENT_LIST: "/v1/get-assignment-list",
  GET_ASSIGNMENT_LIST_BY_GUARDIAN: "/v1/get-assignment-list-by-guardian",
  GET_ASSIGNMENT_DETAILS_BY_OID: "/v1/get-assignment-details-by-oid",
  GET_ASSIGNMENT_DETAILS_BY_GUARDIAN: "/v1/get-assignment-details-by-guardian",
  SAVE_ASSIGNMENT: "/v1/save-assignment",
  UPDATE_ASSIGNMENT: "/v1/update-assignment",
  SAVE_ASSIGNMENT_MARK: "/v1/save-assignment-mark",
  UPDATE_ASSIGNMENT_MARK: "/v1/update-assignment-mark",
  //expense details report url
  EXPENSE_DETAILS_REPORT: '/v1/get-expense-details-report',

  //Syllabus
  GET_SYLLABUS_LIST: "/v1/get-syllabus-list",
  GET_SYLLABUS_BY_OID: "/v1/get-syllabus-by-oid",
  SAVE_SYLLABUS: "/v1/save-syllabus",
  UPDATE_SYLLABUS: "/v1/update-syllabus",

  //Class Term
  GET_INSTITUTE_CLASS_SETTING_TERM_LIST: "/v1/get-institute-class-setting-term-list",

  //NOTIFICATION MESSAGE

  //MESSAGE TEMPLATE
  SAVE_MESSAGE_TEMPLATE_SERVICE: '/v1/save-message-template-service',
  UPDATE_MESSAGE_TEMPLATE_SERVICE: '/v1/update-message-template-service',
  GET_MESSAGE_TEMPLATE_LIST: '/v1/get-message-template-list',
  GET_MESSAGE_TEMPLATE_BY_OID: '/v1/get-message-template-by-oid',

  //MESSAGE TEMPLATE
  GET_MESSAGE_TEMPLATE_PARAMETER_LIST: '/v1/get-message-template-parameter-list',
  // SMS Service
  GET_SMS_SERVICE_LIST: '/v1/get-sms-service-list',
  GET_INSTITUTE_SMS_SERVICE_LIST: '/v1/get-institute-sms-service-list',
  GET_SMS_SERVICE_BY_OID: '/v1/get-sms-service-by-oid',
  SAVE_SMS_SERVICE: '/v1/save-sms-service',
  APPROVE_SMS_SERVICE: '/v1/approve-sms-service',
  REJECT_SMS_SERVICE: '/v1/reject-sms-service',
  UPDATE_SMS_SERVICE: '/v1/update-sms-service',
  CHECK_INSTITUTE_SMS_SERVICE: '/v1/check-institute-sms-service',


  // SMS feature
  GET_SMS_FEATURE_LIST: '/v1/get-sms-feature-list',
  GET_SMS_FEATURE_BY_OID: '/v1/get-sms-feature-by-oid',
  SAVE_SMS_FEATURE: '/v1/save-sms-feature',
  UPDATE_SMS_FEATURE: '/v1/update-sms-feature',


  // SMS Service Log
  GET_SMS_SERVICE_LOG_LIST: '/v1/get-sms-service-log-list',
  GET_SMS_SERVICE_LOG_BY_OID: '/v1/get-sms-service-log-by-oid',
  SAVE_SMS_SERVICE_LOG: '/v1/save-sms-service-log',
  UPDATE_SMS_SERVICE_LOG: '/v1/update-sms-service-log',


  // voucher 
  SAVE_VOUCHER: '/v1/save-voucher',
  UPDATE_VOUCHER: '/v1/update-voucher',
  GET_VOUCHER_LIST: '/v1/get-voucher-list',
  GET_VOUCHER_BY_OID: '/v1/get-voucher-by-oid',
  GET_VOUCHER_BY_STUDENT_ID: '/v1/get-voucher-by-student-id',
  GET_VOUCHER_BY_VOUCHER_NO: '/v1/get-voucher-by-voucher-no',
  CHECK_VOUCHER_STUDENT_LIST_BY_FEE: '/v1/check-voucher-student-list-by-fee',
  CHECK_STUDENT_VOUCHER_BY_FEE: '/v1/check-student-voucher-by-fee',
  GET_VOUCHER_LIST_BY_GUARDIAN_ID: '/v1/get-voucher-list',

  //voucher payment

  SAVE_VOUCHER_PAYMENT: '/v1/save-voucher-payment',
  GET_VOUCHER_PAYMENT_LIST: "/v1/get-voucher-payment-list",
  GET_VOUCHER_PAYMENT_BY_OID: "/v1/get-voucher-payment-by-oid",
  GET_VOUCHER_PAYMENT_LIST_BY_GUARDIAN_ID: '/v1/get-voucher-payment-list-by-guardian-id',

  //MESSAGE SCHEDULE
  SAVE_MESSAGE_SCHEDULE_SERVICE: '/v1/save-message-schedule-service',
  UPDATE_MESSAGE_SCHEDULE_SERVICE: '/v1/update-message-schedule-service',
  GET_MESSAGE_SCHEDULE_LIST: '/v1/get-message-schedule-list',
  GET_MESSAGE_SCHEDULE_BY_OID: '/v1/get-message-schedule-by-oid',


  //MESSAGE JOB
  GET_MESSAGE_JOB_LIST: '/v1/get-message-job-list',
  GET_MESSAGE_JOB_BY_OID: '/v1/get-message-job-by-oid',


  //SECURITY
  UPDATE_PROFILE_BY_LOGIN_ID: "/v1/update-profile-by-login-id",


  //EXCEL SHEET
  GET_STUDENT_LIST_EXCEL_SHEET: '/v1/get-student-list-excel-sheet',
  CREATE_STUDENT_BY_EXCEL_SHEET: "/v1/create-student-by-excel-sheet",
  UPLOAD_STUDENT_DATA_BY_EXCEL: "/v1/upload-student-data-by-excel",

  // Report Service API
  GET_STUDENT_ID_CARD_REPORT: "/v1/get-student-id-card-report",
  GET_STUDENT_TESTIMONIAL_REPORT: "/v1/get-student-testimonial-report",
  GET_STUDENT_LIST_REPORT: '/v1/get-student-list-report',
  GET_TEACHER_LIST_REPORT: '/v1/get-teacher-list-report',
  GET_TEACHER_LIST_EXCEL_SHEET: "/v1/get-teacher-list-excel-sheet",
  GET_GUARDIAN_LIST_REPORT: '/v1/get-guardian-list-report',
  GET_GUARDIAN_LIST_EXCEL_SHEET: "/v1/get-guardian-list-excel-sheet",
  GET_PROMOTION_STUDENT_LIST_REPORT: '/v1/get-promotion-student-list-report',
  GET_STUDENT_PROMOTION_LIST_EXCEL_SHEET: "/v1/get-student-promotion-list-excel-sheet",
  GET_TEACHER_ID_CARD_REPORT: "/v1/get-teacher-id-card-report",
  GET_STUDENT_TRANSCRIPT_REPORT: "/v1/get-student-transcript-report",

  GET_STUDENT_CLASS_DETAILS_REPORT: '/v1/get-student-class-details-report',

  GET_PEOPLE_LIST_REPORT: '/v1/get-people-list-report',
  GET_PEOPLE_LIST_EXCEL_SHEET: "/v1/get-people-list-excel-sheet",
  GET_ASSET_LIST_REPORT: '/v1/get-asset-list-report',
  GET_ASSET_DETAILS_REPORT: '/v1/get-asset-details-report',

  GET_BANK_ACCOUNT_LIST_REPORT: '/v1/get-bank-account-list-report',
  GET_BANK_LIST_EXCEL_SHEET: "/v1/get-bank-list-excel-sheet",
  GET_TEXT_BOOK_LIST_REPORT: '/v1/get-text-book-list-report',

  GET_STUDENT_ATTENDANCE__REPORT: '/v1/get-student-attendance-report',

  GET_TEACHER_ATTENDANCE_REPORT_BY_DATE: "/v1/get-teacher-attendance-report-by-date",

  GET_CLASS_ROUTINE_REPORT: '/v1/get-class-routine-report',

  GET_CONTACT_GROUP_LIST_REPORT: '/v1/get-contact-group-list-report',
  GET_CONTACT_LIST_REPORT: '/v1/get-contact-list-report',
  GET_EXAM_RESULT_REPORT: '/v1/get-exam-result-report',
  GET_EXAM_ROUTINE_REPORT: '/v1/get-exam-routine-report',

  GET_ACCOUNT_RECEIVABLE_REPORT: '/v1/get-account-receivable-report',
  GET_ACCOUNT_RECEIVABLE_LIST_EXCEL_SHEET: "/v1/get-account-receivable-list-excel-sheet",
  GET_ACCOUNT_PAYABLE_REPORT: '/v1/get-account-payable-report',
  GET_ACCOUNT_PAYABLE_LIST_EXCEL_SHEET: "/v1/get-account-payable-list-excel-sheet",
  GET_ADVANCE_PAYMENT_REPORT: '/v1/get-advance-payment-report',
  GET_ADVANCE_PAYMENT_LIST_EXCEL_SHEET: "/v1/get-advance-received-list-excel-sheet",
  GET_ADVANCE_RECEIVED_REPORT: '/v1/get-advance-received-report',
  GET_ADVANCE_RECEIVED_LIST_EXCEL_SHEET: "/v1/get-advance-received-list-excel-sheet",
  GET_SALARY_PAYABLE_REPORT: '/v1/get-salary-payable-report',
  GET_SALARY_PAYABLE_LIST_EXCEL_SHEET: "/v1/get-salary-payable-list-excel-sheet",
  GET_BALANCE_SHEET_REPORT: '/v1/get-balance-sheet-report',
  GET_BALANCE_SHEET_EXCEL_SHEET: "/v1/get-balance-sheet-excel-sheet",
  GET_LEDGER_BALANCE_REPORT: '/v1/get-ledger-balance-report',

  GET_ADMISSION_LIST_REPORT: '/v1/get-admission-list-report',
  GET_JOURNAL_SUMMARY_REPORT: '/v1/get-journal-summary-report',


  GET_VOUCHER_REPORT: '/v1/get-voucher-report',
  GET_VOUCHER_PAYMENT_REPORT: '/v1/get-payment-report',


  //
  GET_FEE_DUE_BY_APPLICATION_TRACKING_ID: "/v1/get-fee-due-by-application-tracking-id",
  UPDATE_FEE_DUE: "/v1/update-fee-due"
};