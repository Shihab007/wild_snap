export class CommonChangePasswordRequestBody {
  loginId: string;
  email: string;
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}
