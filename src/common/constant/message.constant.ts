export const INCORRECT_EMAIL_OR_PASSWORD = 'Incorrect email or password';
export const SESSION_EXPIRED = 'Your session has expired, please log in again';
export const DEFAULT_FEE_NOT_FOUND =
  'Unable to retrieve default fee from system configuration, please enter a fee';
export const PATIENT_NOT_FOUND = 'Patient not found';
export const IP_NOT_FOUND = 'IP not found';
export const COUNTRY_NOT_FOUND = 'Country not found';
export const ALREADY_SUBSCRIBED =
  'You are already subscribed to the newsletter.';
export const UNSUBSCRIBED_SUCCESS =
  'You have been unsubscribed from the newsletter successfully.';
export const SUBSCRIPTION_SUCCESS =
  'You have successfully subscribed to the newsletter.';
export const NOT_SUBSCRIBED = 'You are not subscribed to the newsletter.';
export const PASSWORD_UPPERCASE =
  'Password must contain at least one uppercase letter';
export const PASSWORD_LOWERCASE =
  'Password must contain at least one lowercase letter';
export const PASSWORD_NUMBER = 'Password must contain at least one number';
export const PASSWORD_SPECIAL_CHAR =
  'Password must contain at least one special character';
export const AREEKA_USER_ROLE = 'At least one role is required';
export const PLAN_COUNTRY = 'At least one country is required';
export const PLAN_SESSION_TYPE = 'At least one session type is required';
export const DOCTOR_ALREADY_REGISTERED = 'Doctor already registered';
export const DOCTOR_SUBMISSION_EXISTS =
  'A submission with this email or phone number or registration number already exists and is waiting for approval';
export const FILE_UPLOAD_FAILED = 'File upload failed';
export const SIGNED_URL_FAILED = 'Failed to generate signed URL';
export const DOCTOR_SUBMISSION_REVIEWED = 'Doctor submission already reviewed';
export const OTP_NOT_SENT = 'Error sending validation code';
export const OTP_EXPIRATION_NOT_FOUND = 'OTP expiration not found';
export const INVALID_OR_EXPIRED_OTP = 'Invalid or expired OTP';
export const EMAIL_OTP_REQUIRED =
  'Only email OTP verification is allowed for this operation';
export const USER_ALREADY_EXISTS = 'User already exists';
export const PROFILE_PICTURE_NOT_FOUND = 'Profile picture not found';
export const RESUME_NOT_FOUND = 'Resume not found';
export const DEGREES_NOT_FOUND = 'Degree(s) not found';
export const EMAIL_NOT_SENT = 'Error sending email';
export const STRIPE_WEBHOOK_FAILED = 'Stripe webhook failed';
export const STRIPE_CONNECT_ACCOUNT_CREATION_FAILED =
  'Stripe connect account creation failed';
export const STRIPE_CUSTOMER_CREATION_FAILED =
  'Stripe customer creation failed';
export const STRIPE_WEBHOOK_HANDLING_FAILED = 'Failed to handle webhook ';
export const PASSWORDS_NOT_MATCH = 'Passwords do not match';
export const INCORRECT_PASSWORD = 'Incorrect password';
export const EMAIL_ALREADY_USED = 'Email already used';
export const PHONE_NUMBER_ALREADY_USED = 'Phone number already used';
export const BLOG_CATEGORY_ASSIGNED =
  'This category can’t be deleted because it’s still assigned to one or more blogs';
export const DOCTOR_PROFILE_UPDATE_EXISTS =
  'Doctor profile update already exists';
export const MIN_DEGREES_NUMBER = 'You must upload at least one degree';
export const INSUFFICIENT_OR_INVALID_CREDITS =
  'Insufficient or invalid credits';
export const SESSION_REQUEST_ALREADY_EXISTS =
  'Session request already exists with this doctor';
export const ON_SITE_SESSION_NOT_ENABLED =
  'On-site session is not enabled for this doctor';
export const PATIENT_DOCTOR_NOT_MATCHED =
  'Patient is not matched with the doctor';
export const INVALID_DOCTOR_OR_SESSION_TYPE = 'Invalid doctor or session type';
export const SLOT_OVERLAP = 'Slot overlaps with an existing slot';
export const BLOG_BLOG_CATEGORY = 'At least one blog category is required';
export const BLOG_TAG = 'At least one blog tag is required';
export const TAG_ASSIGNED =
  'This tag is assigned to one or more blogs and cannot be deleted.';
export const CONTACT_REQUEST_ASSIGNED_OR_RESOLVED =
  'Contact request already assigned or resolved';
export const CONTACT_REQUEST_NOT_ASSIGNED_OR_RESOLVED =
  'Contact request not assigned or already resolved';
export const CONTACT_REQUEST_ASSIGNED_USER =
  'Contact request is assigned to another user';
export const AMOUNT_EXCEEDS_BALANCE = 'Amount exceeds balance';
export const INVALID_ENCRYPTION_KEY =
  'ENCRYPTION_KEY must be a 64-character hex string';
export const ENCRYPTION_FAILED = 'Encryption failed';
export const DECRYPTION_FAILED = 'Decryption failed';
export const USER_BANK_DETAIL_EXISTS = 'User bank detail already exists';
export const DOCTOR_PROFILE_UPDATE_REVIEWED =
  'Doctor profile update already reviewed';
export const DOCUMENT_NOT_FOUND =
  'One or more required documents were not found';
export const SESSION_REQUEST_NOT_OWNER =
  'You are not authorized to perform this action on this session request';
export const SESSION_REQUEST_NOT_PENDING = 'Session request is not pending';
export const STRIPE_PAYMENT_METHODS_FETCH_FAILED =
  'Failed to fetch payment methods';
export const STRIPE_PAYMENT_METHOD_ATTACH_FAILED =
  'Failed to attach payment method';
export const STRIPE_PAYMENT_METHOD_DETACH_FAILED =
  'Failed to detach payment method';
export const STRIPE_PAYMENT_INTENT_CREATION_FAILED =
  'Failed to create payment intent';
export const STRIPE_PAYMENT_INTENT_CONFIRMATION_FAILED =
  'Failed to confirm payment intent';
export const STRIPE_PAYMENT_INTENT_RETRIEVE_FAILED =
  'Failed to retrieve payment intent';
export const INVALID_USER_TYPE = 'Invalid user type';
export const INVALID_CREDIT_CARD = 'Credit card not found or not owned by user';
export const INVALID_PLAN = 'Plan not found or not available for user';
export const INVALID_PAYMENT_INTENT = 'Payment intent not owned by user';
export const PAYMENT_INTENT_CAN_NOT_BE_CONFIRMED =
  'Payment intent cannot be confirmed in its current status: ';
export const SESSION_NOT_OWNED = 'Session not owned by user';
export const SESSION_NOT_AVAILABLE = 'Session not available';
export const SESSION_ALREADY_STARTED = 'Session already started';
export const INVITATION_EXISTS = 'Session invitation already exists';
export const MAX_PATIENTS_REACHED = 'Maximum number of patients reached';
export const INVALID_INVITATION_STATUS = 'The invitation status is not valid.';
export const INVALID_USER_EMAIL =
  'The user email does not match the invitation recipient.';
export const DOCTOR_SLOT_NOT_AVAILABLE = 'Doctor slot is not available';
export const CANCELLATION_TIMOUT_NOT_FOUND = 'Cancellation timeout not found';
export const SESSION_NOT_CANCELLABLE = 'Session is not cancellable';
export const INVALID_SESSION_DATE = 'Session date is not valid';
export const SESSION_NOT_SHOWN_TIMEOUT_NOT_FOUND =
  'Session not shown timeout not found';
export const INVALID_SESSION_NOT_SHOWN =
  "You can't mark this session as not shown, please wait until the legal timeout is over";
export const SESSION_ONSITE_ONLY =
  "This session is online, you can't mark it as completed or not shown";
export const SESSION_ONLINE_ONLY =
  "This session is on-site, you can't mark it as started, completed, or not shown";
export const INVALID_SESSION_STATUS = 'Invalid session status';
export const BAN_REASON_MANDATORY = 'Ban reason is mandatory';
export const INVALID_LOGIN_PUBLIC_USER = 'Invalid login user';
export const INVALID_COUPON_CODE = 'Invalid or expired coupon code';
export const PLAN_TRANSACTION_EXCEEDS_LIMIT =
  'You have exceeded the purchase limit by user for this plan';
export const PLAN_NOT_STARTED_OR_EXPIRED =
  'The plan has not started or has expired';
export const USER_EMAIL_NOT_EXISTS = 'User with this email does not exist';
export const SYS_CONFIG_MUST_BE_FLOAT =
  'System configuration value must be a number with up to two decimals';
export const USER_NOT_ACTIVE =
  'Your account has been deactivated. Please contact the administrator.';
export const USER_BANNED =
  'Your account has been banned, please contact support.';
export const PATIENT_ALREADY_MATCHED_SESSION_TYPE =
  'Patient already matched with a doctor for this session type';
export const PATIENT_NOT_MATCHED_SESSION_TYPE =
  'Patient not matched with a doctor for this session type';
export const SESSION_DOCTOR_SESSION_TYPE_EXISTS =
  'You have a session booked or started with this doctor and session type';
export const USER_NOT_FOUND = 'user not found';
