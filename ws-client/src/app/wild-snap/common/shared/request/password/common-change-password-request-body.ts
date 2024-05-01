export class CommonChangePasswordRequestBody {
  loginId: string;
  username: string;
  email: string;
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}
