// define the Login interface
export interface LoginResponse {
  user: { id: string; name: string; email: string; role: string; isVerified: boolean }
  access_token: string
  refresh_token: string
}

// define the Account interface
export interface Account {
  email?: string
  password?: string
  confirmPassword?: string
  name?: string
  phone?: string
}

// define the RegisterReponse interface
export interface RegisterReponse {
  name: string
  email: string
  password: string
  confirmPassword: string
  phone?: string
}

export interface Login {
  email?: string
  password?: string
}
export interface VerifyEmail {
  email?: string
  verificationCode?: string
}
export interface ForgotPassword {
  email?: string
}
export interface ResetPassword {
  newPassword?: string
  confirm_password?: string
}
export interface ChangePassword {
  current_password?: string
  password?: string
  confirm_password?: string
}
