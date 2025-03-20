import { z } from 'zod'

export const LoginBody = z
  .object({
    email: z.string().min(numberConstants.TWO, {
      message: 'Email is valid.'
    }),
    password: z
      .string()
      .min(numberConstants.ONE, {
        message: 'Password is required'
      })
      .regex(validator.passwordRegex, {
        message: 'Password must be at least 6 characters long, contain at least one uppercase letter and one number'
      })
  })
  .strict()

export type LoginBodyType = z.TypeOf<typeof LoginBody>

import { numberConstants } from '@/configs/consts'
import { validator } from '@/core/helpers/validator'

export const RegisterBody = z.object({
  name: z.string().min(numberConstants.TWO, {
    message: 'Name is valid.'
  }),
  email: z.string().min(numberConstants.TWO, {
    message: 'Email is valid.'
  }),
  password: z
    .string()
    .min(numberConstants.ONE, {
      message: 'Password is required'
    })
    .regex(validator.passwordRegex, {
      message: 'Password must be at least 6 characters long, contain at least one uppercase letter and one number'
    }),
  confirmPassword: z
    .string()
    .min(numberConstants.ONE, {
      message: 'Password is required'
    })
    .regex(validator.passwordRegex, {
      message: 'Password must be at least 6 characters long, contain at least one uppercase letter and one number'
    }),
  phone: z.string().min(numberConstants.TEN, {
    message: 'Phone number must be at least 10 characters.'
  })
})
export type RegisterBodyType = z.TypeOf<typeof RegisterBody>

export const VerifyEmailBody = z.object({
  email: z.string().email('Email không hợp lệ').optional(),
  verificationCode: z.string().min(6, 'Mã xác thực phải có 6 ký tự').max(6, 'Mã xác thực phải có 6 ký tự').optional()
})
export type VerifyEmailBodyType = z.TypeOf<typeof VerifyEmailBody>
