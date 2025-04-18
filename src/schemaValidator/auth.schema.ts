import { z } from 'zod'
import { numberConstants } from '@/configs/consts'
import { validator } from '@/core/helpers/validator'

export const LoginBody = z
  .object({
    email: z.string().min(1, 'Email là bắt buộc').email('Email không hợp lệ'),
    password: z
      .string()
      .min(numberConstants.ONE, {
        message: 'Mật khẩu là bắt buộc'
      })
      .regex(validator.passwordRegex, {
        message: 'Mật khẩu phải có ít nhất 6 ký tự, chứa ít nhất một chữ cái viết hoa, một số và một ký tự đặc biệt'
      })
  })
  .strict()

export type LoginBodyType = z.TypeOf<typeof LoginBody>

export const RegisterBody = z
  .object({
    name: z.string().min(1, 'Tên là bắt buộc'),
    email: z.string().min(1, 'Email là bắt buộc').email('Email không hợp lệ'),
    password: z.string().min(6, 'Mật khẩu là bắt buộc').regex(validator.passwordRegex, {
      message: 'Mật khẩu phải có ít nhất 6 ký tự, chứa ít nhất một chữ cái viết hoa, một số và một ký tự đặc biệt'
    }),
    confirmPassword: z.string().min(1, 'Mật khẩu là bắt buộc').regex(validator.passwordRegex, {
      message: 'Mật khẩu phải có ít nhất 6 ký tự, chứa ít nhất một chữ cái viết hoa, một số và một ký tự đặc biệt'
    }),
    phone: z.string().min(1, 'Số điện thoại là bắt buộc'),
    role: z.enum(['USER', 'ADMIN', 'DOCTOR', 'EMPLOYEE']).optional()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu không khớp',
    path: ['confirmPassword']
  })

export type RegisterBodyType = z.infer<typeof RegisterBody>

export const VerifyEmailBody = z.object({
  email: z.string().email('Email không hợp lệ').optional(),
  verificationCode: z.string().min(6, 'Mã xác thực phải có 6 ký tự').max(6, 'Mã xác thực phải có 6 ký tự').optional()
})
export type VerifyEmailBodyType = z.TypeOf<typeof VerifyEmailBody>

export const ForgotPasswordBody = z
  .object({
    email: z.string().min(1, 'Email là bắt buộc').email('Email không hợp lệ')
  })
  .strict()

export type ForgotPasswordBodyType = z.TypeOf<typeof ForgotPasswordBody>

export const ResetPasswordBody = z.object({
  newPassword: z
    .string()
    .min(numberConstants.ONE, {
      message: 'Mật khẩu là bắt buộc'
    })
    .regex(validator.passwordRegex, {
      message: 'Mật khẩu phải có ít nhất 6 ký tự, chứa ít nhất một chữ cái viết hoa, một số và một ký tự đặc biệt'
    }),
  confirm_password: z
    .string()
    .min(numberConstants.ONE, {
      message: 'Mật khẩu là bắt buộc'
    })
    .regex(validator.passwordRegex, {
      message: 'Mật khẩu phải có ít nhất 6 ký tự, chứa ít nhất một chữ cái viết hoa và một số'
    })
})

export type ResetPasswordBodyType = z.TypeOf<typeof ResetPasswordBody>

export const ChangePasswordBody = z
  .object({
    current_password: z
      .string()
      .min(numberConstants.ONE, {
        message: 'Mật khẩu là bắt buộc'
      })
      .regex(validator.passwordRegex, {
        message: 'Mật khẩu phải có ít nhất 6 ký tự, chứa ít nhất một chữ cái viết hoa, một số và một ký tự đặc biệt'
      }),

    password: z
      .string()
      .min(numberConstants.ONE, {
        message: 'Mật khẩu là bắt buộc'
      })
      .regex(validator.passwordRegex, {
        message: 'Mật khẩu phải có ít nhất 6 ký tự, chứa ít nhất một chữ cái viết hoa, một số và một ký tự đặc biệt'
      }),

    confirm_password: z
      .string()
      .min(numberConstants.ONE, {
        message: 'Mật khẩu là bắt buộc'
      })
      .regex(validator.passwordRegex, {
        message: 'Mật khẩu phải có ít nhất 6 ký tự, chứa ít nhất một chữ cái viết hoa, một số và một ký tự đặc biệt'
      })
  })
  .strict()

export type ChangePasswordBodyType = z.TypeOf<typeof ChangePasswordBody>

export const LogoutBody = z.object({
  refresh_token: z.string().min(1, 'Refresh token là bắt buộc')
})

export type LogoutBodyType = z.TypeOf<typeof LogoutBody>

export const RefreshTokenBody = z.object({
  refresh_token: z.string().min(1, 'Refresh token là bắt buộc')
})

export type RefreshTokenBodyType = z.TypeOf<typeof RefreshTokenBody>
