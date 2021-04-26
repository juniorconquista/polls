import React from 'react'
import { Signup } from '@/presentation/pages'
import { makeSignupValidation } from './signup-validation-factory'

export const makeSignup: React.FC = () => {
  return (
    <Signup
      validation={makeSignupValidation()}
    />
  )
}
